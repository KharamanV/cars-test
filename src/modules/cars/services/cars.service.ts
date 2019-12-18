import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Manufacturer, ManufacturerService } from '../../manufacturers';
import { CreateCarDto, UpdateCarDto } from '../dto';
import { Car } from '../entities';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    private readonly manufacturerService: ManufacturerService,
  ) {}

  findAll(): Promise<Car[]> {
    return this.carRepository.find();
  }

  async findOne(id: string): Promise<Car> {
    const car: Car | undefined = await this.carRepository.findOne(id);

    if (!car) {
      throw new NotFoundException('No such car');
    }

    return car;
  }

  async createCar(data: CreateCarDto): Promise<Car> {
    const manufacturer:
      | Manufacturer
      | undefined = await this.manufacturerService.findOne(data.manufacturerId);

    if (!manufacturer) {
      throw new BadRequestException('No such manufacturer');
    }

    const car = this.carRepository.create(data);

    car.manufacturer = manufacturer;

    return this.carRepository.save(car);
  }

  async updateCar(carId: string, data: UpdateCarDto): Promise<Car> {
    const { affected } = await this.carRepository.update(carId, data);

    if (affected === 0) {
      throw new NotFoundException('No such car');
    }

    return this.carRepository.findOne(carId);
  }

  async deleteCar(carId: string): Promise<void> {
    const { affected } = await this.carRepository.delete(carId);

    if (affected === 0) {
      throw new NotFoundException('No such car');
    }
  }

  async findCarManufacturer(carId: string): Promise<Manufacturer> {
    const car = await this.carRepository.findOne(carId);

    if (!car) {
      throw new NotFoundException('No such car');
    }

    return car.manufacturer;
  }
}
