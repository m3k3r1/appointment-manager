import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindProviderDayAppointmentsDTO from '@modules/appointments/dtos/IFindProviderDayAppointmentsDTO';
import IFindProviderMonthAppointmentsDTO from '@modules/appointments/dtos/IFindProviderMonthAppointmentsDTO';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getRepository, Raw, Repository } from 'typeorm';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findProviderMonthAppointments({
    provider_id,
    year,
    month,
  }: IFindProviderMonthAppointmentsDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const findAppointment = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}' `,
        ),
      },
    });

    return findAppointment;
  }

  public async findProviderDayAppointments({
    provider_id,
    day,
    year,
    month,
  }: IFindProviderDayAppointmentsDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const findAppointment = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}' `,
        ),
      },
    });

    return findAppointment;
  }

  public async create({
    date,
    provider_id,
    user_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}
export default AppointmentsRepository;
