import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthentication';
import { Router } from 'express';
import AppointmenstsController from '../controllers/AppointmentsController';
import ProvidersAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmenstsController();
const providerAppointmentsController = new ProvidersAppointmentsController();
appointmentRouter.use(ensureAuthenticated);

appointmentRouter.post('/', appointmentsController.create);
appointmentRouter.get('/me', providerAppointmentsController.index);

export default appointmentRouter;
