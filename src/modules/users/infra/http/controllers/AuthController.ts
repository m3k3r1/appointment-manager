import AuthService from '@modules/users/services/AuthService';
import { classToClass } from 'class-transformer';
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
    return response.json({ user: classToClass(user), token });
  }
}
