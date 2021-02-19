import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindProviderDayAppointmentsDTO from '../dtos/IFindProviderDayAppointmentsDTO';
import IFindProviderMonthAppointmentsDTO from '../dtos/IFindProviderMonthAppointmentsDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentRepository {
  findProviderDayAppointments(
    data: IFindProviderDayAppointmentsDTO,
  ): Promise<Appointment[] | undefined>;
  findProviderMonthAppointments(
    data: IFindProviderMonthAppointmentsDTO,
  ): Promise<Appointment[] | undefined>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  create(createAppointmentDTO: ICreateAppointmentDTO): Promise<Appointment>;
}
