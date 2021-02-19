import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentRepository: IAppointmentRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list the month availability for the provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'asdfasdf',
      date: new Date(2020, 3, 20, 8, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'asdfasdf',
      date: new Date(2020, 3, 20, 9, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'asdfasdf',
      date: new Date(2020, 3, 20, 10, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'asdfasdf',
      date: new Date(2020, 3, 20, 11, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'asdfasdf',
      date: new Date(2020, 3, 20, 12, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'asdfasdf',
      date: new Date(2020, 3, 20, 13, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'asdfasdf',
      date: new Date(2020, 3, 20, 14, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'asdfasdf',
      date: new Date(2020, 3, 20, 15, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'asdfasdf',
      date: new Date(2020, 3, 20, 16, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'asdfasdf',
      date: new Date(2020, 3, 20, 17, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'asdfasdf',
      date: new Date(2020, 3, 21, 17, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'asdfasdf',
      year: 2020,
      month: 4,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
      ]),
    );
  });
});
