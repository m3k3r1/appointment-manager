import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User  does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const hoursDiference = differenceInHours(Date.now(), tokenCreatedAt);
    if (hoursDiference && hoursDiference > 2) {
      throw new AppError('Token expired');
    }
    user.password = await this.hashProvider.generateHash(password);
    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
