import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';
import IUserRepository from '../IUsersRepository';

export default class FakeUsersRepository implements IUserRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    if (except_user_id) {
      users = users.filter(user => user.id !== except_user_id);
    }

    return users;
  }

  async create(createUserDTO: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(
      user,
      {
        id: uuid(),
      },
      createUserDTO,
    );

    this.users.push(user);

    return user;
  }

  async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => user.id === findUser.id);
    this.users[findIndex] = user;
    return user;
  }
}
