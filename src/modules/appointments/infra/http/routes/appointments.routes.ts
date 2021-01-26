import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthentication';
import { Router } from 'express';
import AppointmenstsController from '../controllers/AppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmenstsController();

appointmentRouter.use(ensureAuthenticated);

// appointmentRouter.get('/', async (request, response) => {
//   const appointments = await appointmentRepository.find();

//   return response.json(appointments);
// });

appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;
