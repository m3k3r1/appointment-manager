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
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: '16256371253',
      user_id: 'aksdfh',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('16256371253');
  });
  it('should not be able to create two appointment on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const date = new Date(2020, 4, 11, 13);
    await createAppointment.execute({
      date,
      provider_id: '16256371253',
      user_id: 'aksdfh',
    });

    await expect(
      createAppointment.execute({
        date,
        provider_id: '16256371253',
        user_id: 'aksdfh',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create appointmenst in a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const date = new Date(2020, 4, 10, 11);

    await expect(
      createAppointment.execute({
        date,
        provider_id: '16256371253',
        user_id: 'aksdfh',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create appointmenst with himself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 6).getTime();
    });

    const date = new Date(2020, 4, 10, 11);

    await expect(
      createAppointment.execute({
        date,
        provider_id: 'aksdfh',
        user_id: 'aksdfh',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create appointmenst out working hours', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 6).getTime();
    });

    const date1 = new Date(2020, 4, 10, 7);
    const date2 = new Date(2020, 4, 10, 18);

    await expect(
      createAppointment.execute({
        date: date1,
        provider_id: 'aksdfh',
        user_id: '3452345',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: date2,
        provider_id: 'aksdfh',
        user_id: '23452345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
