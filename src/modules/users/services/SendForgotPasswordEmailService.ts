import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUserRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendMail(email, `Password Recovery: ${token}`);
  }
}

export default SendForgotPasswordEmailService;
