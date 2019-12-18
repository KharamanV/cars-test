import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCarDto, CarIdParams, UpdateCarDto } from '../dto';
import { Manufacturer } from '../../manufacturers';
import { Car } from '../entities';
import { CarsService } from '../services';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  fetchCars(): Promise<Car[]> {
    return this.carsService.findAll();
  }

  @Get(':id')
  fetchSpecificCar(@Param() params: CarIdParams): Promise<Car> {
    return this.carsService.findOne(params.id);
  }

  @Post()
  createCar(@Body() body: CreateCarDto): Promise<Car> {
    return this.carsService.createCar(body);
  }

  @Patch(':id')
  updateCar(
    @Param() params: CarIdParams,
    @Body() body: UpdateCarDto,
  ): Promise<Car> {
    return this.carsService.updateCar(params.id, body);
  }

  @Delete(':id')
  deleteCar(@Param() params: CarIdParams): Promise<void> {
    return this.carsService.deleteCar(params.id);
  }

  @Get(':id/manufacturer')
  fetchCarManufacturer(@Param() params: CarIdParams): Promise<Manufacturer> {
    return this.carsService.findCarManufacturer(params.id);
  }
}
