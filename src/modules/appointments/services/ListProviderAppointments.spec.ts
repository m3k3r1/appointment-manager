import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import ListProvidersAppointmentsService from './ListProviderAppointments';

let fakeAppointmentRepository: IAppointmentRepository;
let listProvidersAppointments: ListProvidersAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    listProvidersAppointments = new ListProvidersAppointmentsService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list for the provider', async () => {
    const appointment = await fakeAppointmentRepository.create({
      provider_id: 'asdfasdf',
      date: new Date(2020, 4, 20, 14, 0, 0),
      user_id: 'aksdfh',
    });

    const availability = await listProvidersAppointments.execute({
      provider_id: 'asdfasdf',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(expect.arrayContaining([appointment]));
  });
});
