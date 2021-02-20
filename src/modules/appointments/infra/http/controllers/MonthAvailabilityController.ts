import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class MonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { year, month } = request.body;
    const { provider_id } = request.params;
    const listProviders = container.resolve(
      ListProviderMonthAvailabilityService,
    );
    const providersList = await listProviders.execute({
      provider_id,
      year,
      month,
    });
    return response.json(providersList);
  }
}
