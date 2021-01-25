import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  async create(createUserDTO: ICreateUserDTO): Promise<User> {
    const user = await this.ormRepository.create(createUserDTO);
    await this.ormRepository.save(user);
    return user;
  }

  async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
export default UserRepository;
