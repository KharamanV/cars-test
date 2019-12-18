import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron';
import { OwnersService } from '../modules/owners';

@Injectable()
export class ScheduleService {
  private EVERY_DAY_PATTERN = '0 0 * * *';

  constructor(private readonly ownerService: OwnersService) {
    new CronJob(
      this.EVERY_DAY_PATTERN,
      this.removeOldOwners.bind(this),
    ).start();
  }

  async removeOldOwners() {
    console.log('[Cron Job]: Removing old owners...');

    await this.ownerService.removeOldOwners();

    console.log('[Cron Job]: Removing old owners - DONE');
  }
}
