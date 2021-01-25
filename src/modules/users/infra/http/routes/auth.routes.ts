import AuthService from '@modules/users/services/AuthService';
import { Router } from 'express';
import { container } from 'tsyringe';

const authRouter = Router();

authRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateUser = container.resolve(AuthService);
  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });
  delete user.password;
  return response.json({ user, token });
});

export default authRouter;
