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
import { CarsService } from '../services';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  fetchCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  fetchSpecificCar(@Param() params: CarIdParams) {
    return this.carsService.findOne(params.id);
  }

  @Post()
  createCar(@Body() body: CreateCarDto) {
    return this.carsService.createCar(body);
  }

  @Patch(':id')
  updateCar(@Param() params: CarIdParams, @Body() body: UpdateCarDto) {
    return this.carsService.updateCar(params.id, body);
  }

  @Delete(':id')
  deleteCar(@Param() params: CarIdParams) {
    return this.carsService.deleteCar(params.id);
  }

  @Get(':id/manufacturer')
  fetchCarManufacturer(@Param() params: CarIdParams) {
    return this.carsService.findCarManufacturer(params.id);
  }
}
