import { Router } from 'express';
import appointmentRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import authRouter from '@modules/users/infra/http/routes/auth.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/appointments', appointmentRouter);
routes.use('/providers', providersRouter);
routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
