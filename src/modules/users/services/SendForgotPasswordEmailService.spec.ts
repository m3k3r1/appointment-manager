import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersReposityory';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokenRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswrodEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokenRepository();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to recover the pasword using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      email: 'mail@test.com',
      name: 'Miguel',
      password: 'abc123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'mail@test.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover the pasword using the email of a non existent user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'mail@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token to existent users', async () => {
    const generate = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      email: 'mail@test.com',
      name: 'Miguel',
      password: 'abc123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'mail@test.com',
    });

    expect(generate).toHaveBeenCalledWith(user.id);
  });
});
