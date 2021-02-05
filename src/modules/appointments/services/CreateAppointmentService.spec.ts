import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: IAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });
  it('should be able to create an appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '16256371253',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('16256371253');
  });
  it('should not be able to create two appointment on the same time', async () => {
    const date = new Date(2020, 4, 10, 11);
    await createAppointment.execute({
      date,
      provider_id: '16256371253',
    });

    expect(
      createAppointment.execute({
        date,
        provider_id: '16256371253',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
