import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import { container } from 'tsyringe';
import '@modules/users/providers';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
