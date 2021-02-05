import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersReposityory';
import IUserRepository from '../repositories/IUsersRepository';
import AuthService from './AuthService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: IUserRepository;
let fakeHashProvider: IHashProvider;
let createUser: CreateUserService;
let authService: AuthService;

describe('AuthUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authService = new AuthService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to authenticate an user with correct credentials', async () => {
    const user = await createUser.execute({
      email: 'mail@test.com',
      name: 'Miguel',
      password: 'abc123123',
    });

    const auth = await authService.execute({
      email: 'mail@test.com',
      password: 'abc123123',
    });

    expect(auth).toHaveProperty('token');
    expect(auth.user).toEqual(user);
  });
  it('should not be able to authenticate an user with wrong credentials', async () => {
    await createUser.execute({
      email: 'mail@test.com',
      name: 'Miguel',
      password: 'abc123123',
    });

    expect(
      authService.execute({
        email: 'mail@test.com',
        password: 'wrong',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate an user that doesnt exists', async () => {
    expect(
      authService.execute({
        email: 'mail@test.com',
        password: 'abc12312',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
