import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersReposityory';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokenRepository;
let fakeHashProvider: IHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });
  it('should be able to reset the pasword using the email', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await fakeUsersRepository.create({
      email: 'mail@test.com',
      name: 'Miguel',
      password: 'abc123123',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      password: 'newPassword',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toBeCalledWith('newPassword');
    expect(updatedUser?.password).toBe('newPassword');
  });
  it('should not be able to reset the pasword using a non existent token', async () => {
    await expect(
      resetPassword.execute({
        password: 'newPassword',
        token: 'non-existent-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset the pasword using a non existent user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existent-user',
    );

    await expect(
      resetPassword.execute({
        password: 'newPassword',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset after 2h of token creation', async () => {
    const user = await fakeUsersRepository.create({
      email: 'mail@test.com',
      name: 'Miguel',
      password: 'abc123123',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: 'newPassword',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
