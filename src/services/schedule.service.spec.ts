import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleService } from './schedule.service';
import { OwnersService } from '../modules/owners/services';

describe('Schedule Service', () => {
  jest.mock('cron', () => ({ CronJob: class {} }));

  let scheduleService: ScheduleService;
  let ownerService: OwnersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleService,
        { provide: OwnersService, useValue: { removeOldOwners: jest.fn() } },
      ],
    }).compile();

    scheduleService = module.get<ScheduleService>(ScheduleService);
    ownerService = module.get<OwnersService>(OwnersService);
  });

  it('should be defined', () => {
    expect(scheduleService).toBeDefined();
    expect(ownerService).toBeDefined();
  });

  it('should remove old owners', async () => {
    const removeSpy = jest.fn(() => Promise.resolve(undefined));

    jest.spyOn(ownerService, 'removeOldOwners').mockImplementation(removeSpy);

    await scheduleService.removeOldOwners();

    expect(removeSpy).toHaveBeenCalled();
  });
});
