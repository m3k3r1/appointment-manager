import CreateUserService from '@services/CreateUserService';
import UpdateUserAvatarService from '@services/UpdateUserAvatar';
import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from 'src/middleware/ensureAuthentication';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);
// usersRouter.get('/', async (request, response) => {});

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = new CreateUserService();
  const user = await createUser.execute({ name, email, password });
  delete user.password;
  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });
    delete user.password;
    return response.json({ user });
  },
);

export default usersRouter;
