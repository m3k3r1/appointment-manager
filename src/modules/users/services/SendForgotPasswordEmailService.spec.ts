import FakeMailProvider from '@shared/container/providers/StorageProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersReposityory';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswrodEmail', () => {
  it('should be able to recover the pasword using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await fakeUsersRepository.create({
      email: 'mail@test.com',
      name: 'Miguel',
      password: 'abc123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'mail@test.com',
    });

    expect(sendMail).toHaveBeenCalledWith();
  });
});
