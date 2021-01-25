import AppointmentsRepository from '@repositories/AppointmentRepository';
import CreateAppointmentService from '@services/CreateAppointmentService';
import { parseISO } from 'date-fns';
import { Router } from 'express';
import ensureAuthenticated from 'src/middleware/ensureAuthentication';
import { getCustomRepository } from 'typeorm';

const appointmentRouter = Router();
appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentRepository.find();

  return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);
  const createAppoitment = new CreateAppointmentService();

  const appointment = await createAppoitment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentRouter;
