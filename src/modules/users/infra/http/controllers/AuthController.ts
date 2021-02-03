import AuthService from '@modules/users/services/AuthService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AuthController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthService);
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });
    delete user.password;
    return response.json({ user, token });
  }
}
