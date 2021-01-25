import AuthService from '@services/AuthService';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateUser = new AuthService();
  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });
  delete user.password;
  return response.json({ user, token });
});

export default authRouter;
