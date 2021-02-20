import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class DayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { year, month, day } = request.body;
    const { provider_id } = request.params;
    const listProviders = container.resolve(ListProviderDayAvailabilityService);
    const providersList = await listProviders.execute({
      provider_id,
      year,
      month,
      day,
    });
    return response.json(providersList);
  }
}
