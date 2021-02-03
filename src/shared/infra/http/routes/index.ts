import appointmentRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import authRouter from '@modules/users/infra/http/routes/auth.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/appointments', appointmentRouter);
routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);

export default routes;
