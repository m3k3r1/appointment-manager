import AuthService from '@modules/users/services/AuthService';
import { Router } from 'express';
import UserRepository from '../../typeorm/repositories/UsersRepository';

const authRouter = Router();

authRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const usersRepository = new UserRepository();
  const authenticateUser = new AuthService(usersRepository);
  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });
  delete user.password;
  return response.json({ user, token });
});

export default authRouter;
