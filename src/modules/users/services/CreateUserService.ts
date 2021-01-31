import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    const hashedPassword = await this.hashProvider.generateHash(password);

    if (userAlreadyExists) {
      throw new AppError('Email address already used');
    }
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return user;
  }
}

export default CreateUserService;
