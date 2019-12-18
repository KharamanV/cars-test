import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarsController } from './controllers';
import { Car } from './entities';
import { CarsService } from './services';
import { ManufacturersModule } from '../manufacturers';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), ManufacturersModule],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
