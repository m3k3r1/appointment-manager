import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthentication';
import { Router } from 'express';
import AppointmenstsController from '../controllers/AppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmenstsController();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;
