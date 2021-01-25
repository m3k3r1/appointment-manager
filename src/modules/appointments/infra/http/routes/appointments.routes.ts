import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthentication';
import { parseISO } from 'date-fns';
import { Router } from 'express';
import { container } from 'tsyringe';

const appointmentRouter = Router();
appointmentRouter.use(ensureAuthenticated);

// appointmentRouter.get('/', async (request, response) => {
//   const appointments = await appointmentRepository.find();

//   return response.json(appointments);
// });

appointmentRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);
  const createAppoitment = container.resolve(CreateAppointmentService);
  const appointment = await createAppoitment.execute({
    date: parsedDate,
    provider_id,
  });
  return response.json(appointment);
});

export default appointmentRouter;
