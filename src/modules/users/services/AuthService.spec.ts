import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersReposityory';
import AuthService from './AuthService';
import CreateUserService from './CreateUserService';

describe('AuthUser', () => {
  it('should be able to authenticate an user with correct credentials', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authService = new AuthService(fakeUsersRepository, fakeHashProvider);

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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authService = new AuthService(fakeUsersRepository, fakeHashProvider);

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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authService = new AuthService(fakeUsersRepository, fakeHashProvider);

    expect(
      authService.execute({
        email: 'mail@test.com',
        password: 'abc12312',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
