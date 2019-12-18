import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from '../entities';
import { ManufacturerService } from '../../manufacturers';
import { Repository } from 'typeorm';

describe('Cars Service', () => {
  let carService: CarsService;
  let manufacturerService: ManufacturerService;
  let carRepository: Repository<Car>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        {
          provide: ManufacturerService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Car),
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    carService = module.get<CarsService>(CarsService);
    manufacturerService = module.get<ManufacturerService>(ManufacturerService);
    carRepository = module.get<Repository<Car>>('CarRepository');
  });

  it('should be defined', () => {
    expect(carService).toBeDefined();
    expect(manufacturerService).toBeDefined();
    expect(carRepository).toBeDefined();
  });

  describe('findOne', () => {
    it('should throw an error if no car', async () => {
      jest
        .spyOn(carRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));

      await expect(carService.findOne('test')).rejects.toThrow();
    });
  });

  describe('createCar', () => {
    it('should throw an error if no manufacturer', async () => {
      jest
        .spyOn(manufacturerService, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));

      await expect(
        carService.createCar({
          manufacturerId: 'test',
          firstRegistrationDate: new Date(),
          price: 100,
        }),
      ).rejects.toThrow();
    });
  });

  describe('updateCar', () => {
    it('should throw an error if no affected rows', async () => {
      jest
        .spyOn(carRepository, 'update')
        .mockImplementation(() =>
          Promise.resolve({ affected: 0, raw: [], generatedMaps: [] }),
        );

      await expect(
        carService.updateCar('test', {
          price: 100,
        }),
      ).rejects.toThrow();
    });
  });

  describe('deleteCar', () => {
    it('should throw an error if no rows was deleted', async () => {
      jest
        .spyOn(carRepository, 'delete')
        .mockImplementation(() =>
          Promise.resolve({ affected: 0, raw: [], generatedMaps: [] }),
        );

      await expect(carService.deleteCar('test')).rejects.toThrow();
    });
  });

  describe('findCarManufacturer', () => {
    it('should throw an error if no car was found', async () => {
      jest
        .spyOn(carRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));

      await expect(carService.findCarManufacturer('test')).rejects.toThrow();
    });
  });
});
