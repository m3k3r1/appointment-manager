import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersReposityory';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create an user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const user = await createUser.execute({
      email: 'mail@test.com',
      name: 'Miguel',
      password: 'abc123123',
    });

    expect(user).toHaveProperty('id');
  });
  it('should not be able to create two user with the same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

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
