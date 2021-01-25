import { hash } from 'bcrypt';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    const hashedPassword = await hash(password, 8);

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
