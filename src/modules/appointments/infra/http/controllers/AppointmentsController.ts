import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmenstsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const user_id = request.user.id;
    const parsedDate = parseISO(date);
    const createAppoitment = container.resolve(CreateAppointmentService);
    const appointment = await createAppoitment.execute({
      date: parsedDate,
      user_id,
      provider_id,
    });
    return response.json(appointment);
  }
}
