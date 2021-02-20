import ListProvidersAppointmentsService from '@modules/appointments/services/ListProviderAppointments';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProvidersAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { year, month, day } = request.body;
    const provider_id = request.user.id;

    const listProviderAppointments = container.resolve(
      ListProvidersAppointmentsService,
    );
    const appointments = await listProviderAppointments.execute({
      provider_id,
      day,
      month,
      year,
    });
    return response.json(appointments);
  }
}
