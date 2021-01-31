import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersReposityory';
import UpdateUserAvatarService from './UpdateUserAvatar';

describe('UpdateUserAvatar', () => {
  it('should be able to update avatar of a registered user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const storageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      storageProvider,
    );

    const user = await fakeUsersRepository.create({
      email: 'mail@test.com',
      name: 'Miguel',
      password: 'abc123123',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'newAvatar.jpg',
    });

    expect(user.avatar).toEqual('newAvatar.jpg');
  });
  it('should not be able to update avatar of non existent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const storageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      storageProvider,
    );

    expect(
      updateUserAvatarService.execute({
        user_id: 'non existent user',
        avatarFilename: 'newAvatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should switch avatar if registered user already has a previous avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const storageProvider = new FakeStorageProvider();
    const deleteFile = jest.spyOn(storageProvider, 'deleteFile');
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      storageProvider,
    );

    const user = await fakeUsersRepository.create({
      email: 'mail@test.com',
      name: 'Miguel',
      password: 'abc123123',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar1.jpg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar1.jpg');
    expect(user.avatar).toEqual('avatar2.jpg');
  });
});
