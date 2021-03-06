import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<User[]> {
    let providers = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

    if (!providers) {
      providers = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });

      await this.cacheProvider.save(`providers-list:${user_id}`, providers);
    }

    return providers;
  }
}
