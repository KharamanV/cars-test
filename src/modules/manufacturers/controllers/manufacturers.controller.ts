import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateManufacturerDto } from '../dto';
import { Manufacturer } from '../entities';
import { ManufacturerService } from '../services';

@Controller('manufacturers')
export class ManufacturersController {
  constructor(private readonly manufacturersService: ManufacturerService) {}

  @Get()
  fetchManufacturers(): Promise<Manufacturer[]> {
    return this.manufacturersService.findAll();
  }

  @Post()
  createManufacturer(
    @Body() body: CreateManufacturerDto,
  ): Promise<Manufacturer> {
    return this.manufacturersService.createManufacturer(body);
  }
}
