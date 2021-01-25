import { Router } from 'express';
import appointmentRouter from './appointments.routes';
import authRouter from './auth.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/appointments', appointmentRouter);
routes.use('/users', usersRouter);

export default routes;
