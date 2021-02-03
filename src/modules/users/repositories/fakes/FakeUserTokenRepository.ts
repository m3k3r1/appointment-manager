import { uuid } from 'uuidv4';
import UserToken from '../../infra/typeorm/entities/UserToken';
import IUserTokensRepository from '../IUserTokenRepository';

export default class FakeUserTokenRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);
    return userToken;
  }

  async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(el => el.token === token);
    return userToken;
  }
}
