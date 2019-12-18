import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manufacturer } from './entities';
import { ManufacturerService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Manufacturer])],
  providers: [ManufacturerService],
  exports: [ManufacturerService],
})
export class ManufacturersModule {}
