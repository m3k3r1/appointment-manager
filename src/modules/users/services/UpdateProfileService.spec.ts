import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersReposityory';
import IUserRepository from '../repositories/IUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: IUserRepository;
let fakeHashProvider: IHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe 2',
      email: 'johndoe2@example.com',
    });

    expect(updatedUser.name).toBe('John Doe 2');
    expect(updatedUser.email).toBe('johndoe2@example.com');
  });
  it('should not be able to update the profile of a inexistent user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'wrong-id',
        name: 'John Doe 2',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update mail to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe 2',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe 2',
      email: 'johndoe2@example.com',
      old_password: '123456',
      password: 'abc123132',
    });

    expect(updatedUser.password).toBe('abc123132');
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe 2',
        email: 'johndoe@example.com',
        password: '12312',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password without a correct password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe 2',
        email: 'johndoe@example.com',
        old_password: 'wrong-password',
        password: '12312',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
