import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturersController } from './controllers';
import { Manufacturer } from './entities';
import { ManufacturerService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Manufacturer])],
  controllers: [ManufacturersController],
  providers: [ManufacturerService],
  exports: [ManufacturerService],
})
export class ManufacturersModule {}
