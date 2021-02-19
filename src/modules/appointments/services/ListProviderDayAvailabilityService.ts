import { getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findProviderDayAppointments(
      {
        provider_id,
        month,
        year,
        day,
      },
    );

    const hourStart = 8;
    const eachHourArray = Array.from(
      {
        length: 10,
      },
      (_, index) => index + hourStart,
    );

    const availability = eachHourArray.map(hour => {
      const appointmentsInHour = appointments.find(appointment => {
        return getHours(appointment.date) === hour;
      });

      return {
        hour,
        available: !appointmentsInHour,
      };
    });

    return availability;
  }
}
