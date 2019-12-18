import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manufacturer } from '../entities';
import { CreateManufacturerDto } from '../dto';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly manufacturerRepository: Repository<Manufacturer>,
  ) {}

  findOne(id: string): Promise<Manufacturer> {
    return this.manufacturerRepository.findOne(id);
  }

  findAll(): Promise<Manufacturer[]> {
    return this.manufacturerRepository.find();
  }

  async createManufacturer(data: CreateManufacturerDto): Promise<Manufacturer> {
    const manufacturer = this.manufacturerRepository.create(data);

    return this.manufacturerRepository.save(manufacturer);
  }
}
