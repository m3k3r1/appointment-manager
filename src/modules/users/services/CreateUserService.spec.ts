import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersReposityory';
import IUserRepository from '../repositories/IUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: IUserRepository;
let fakeHashProvider: IHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create an user', async () => {
    const user = await createUser.execute({
      email: 'mail@test.com',
      name: 'Miguel',
      password: 'abc123123',
    });

    expect(user).toHaveProperty('id');
  });
  it('should not be able to create two user with the same email', async () => {
    await createUser.execute({
      email: 'mail@test.com',
      name: 'Miguel',
      password: 'abc123123',
    });

    expect(
      createUser.execute({
        email: 'mail@test.com',
        name: 'Miguel',
        password: 'abc123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
