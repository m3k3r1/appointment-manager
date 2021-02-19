import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersReposityory';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: IUserRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    const user1 = await fakeUsersRepository.create({
      name: 'John rtyuio',
      email: 'johndoe1@example.com',
      password: '123456',
    });
    const user2 = await fakeUsersRepository.create({
      name: 'John er7890',
      email: 'johndoe2@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute(user.id);

    expect(providers).toEqual([user1, user2]);
  });
});
