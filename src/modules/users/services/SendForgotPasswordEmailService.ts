import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { injectable, inject } from 'tsyringe';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    this.mailProvider.sendMail(email, 'Password Recovery');
  }
}

export default SendForgotPasswordEmailService;
