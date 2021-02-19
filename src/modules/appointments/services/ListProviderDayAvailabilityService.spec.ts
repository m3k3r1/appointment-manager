import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentRepository: IAppointmentRepository;
let listProviderMonthAvailability: ListProviderDayAvailabilityService;

describe('ListMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list the day availability for the provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'asdfasdf',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'asdfasdf',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'asdfasdf',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
