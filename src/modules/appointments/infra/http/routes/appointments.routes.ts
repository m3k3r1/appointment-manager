import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthentication';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import AppointmenstsController from '../controllers/AppointmentsController';
import ProvidersAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmenstsController();
const providerAppointmentsController = new ProvidersAppointmentsController();
appointmentRouter.use(ensureAuthenticated);

appointmentRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  appointmentsController.create,
);
appointmentRouter.get('/me', providerAppointmentsController.index);

export default appointmentRouter;
