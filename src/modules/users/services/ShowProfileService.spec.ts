import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersReposityory';
import IUserRepository from '../repositories/IUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: IUserRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute(user.id);

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('should not be able to show the profile of a inexistent user', async () => {
    await expect(showProfile.execute('wrong id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
