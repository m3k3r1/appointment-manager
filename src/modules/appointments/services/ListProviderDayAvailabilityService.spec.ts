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
      date: new Date(2020, 4, 20, 14, 0, 0),
      user_id: 'aksdfh',
    });
    await fakeAppointmentRepository.create({
      provider_id: 'asdfasdf',
      date: new Date(2020, 4, 20, 15, 0, 0),
      user_id: 'aksdfh',
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
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
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
