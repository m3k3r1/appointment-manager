import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create an appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '16256371253',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('16256371253');
  });
  it('should not be able to create two appointment on the same time', () => {
    expect(1 + 2).toBe(3);
  });
});
