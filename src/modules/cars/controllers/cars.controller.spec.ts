import { Test, TestingModule } from '@nestjs/testing';
import { Manufacturer, ManufacturerService } from '../../manufacturers';
import { Car } from '../entities';
import { CarsService } from '../services';
import { CarsController } from './cars.controller';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Cars Controller', () => {
  let carsController: CarsController;
  let carService: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [
        { provide: getRepositoryToken(Car), useValue: {} },
        {
          provide: CarsService,
          useValue: {
            findAll: jest.fn(),
            createCar: jest.fn(),
            updateCar: jest.fn(),
            deleteCar: jest.fn(),
            findCarManufacturer: jest.fn(),
          },
        },
        { provide: ManufacturerService, useValue: {} },
      ],
    }).compile();

    carsController = module.get<CarsController>(CarsController);
    carService = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(carsController).toBeDefined();
    expect(carService).toBeDefined();
  });

  describe('fetchCars', () => {
    it('should return array of cars', async () => {
      const testData = [
        {
          id: 'test',
          price: 12,
        },
      ] as Car[];

      jest
        .spyOn(carService, 'findAll')
        .mockImplementation(() => Promise.resolve(testData));

      expect(await carsController.fetchCars()).toBe(testData);
    });
  });

  describe('createCar', () => {
    it('should return created car', async () => {
      const testCar = {
        id: 'test',
      } as Car;

      jest
        .spyOn(carService, 'createCar')
        .mockImplementation(() => Promise.resolve(testCar));

      expect(
        await carsController.createCar({
          manufacturerId: 'test',
          firstRegistrationDate: new Date(),
          price: 12,
        }),
      ).toBe(testCar);
    });
  });

  describe('updateCar', () => {
    it('should return updated car', async () => {
      const testCar = {
        id: 'test',
      } as Car;

      jest
        .spyOn(carService, 'updateCar')
        .mockImplementation(() => Promise.resolve(testCar));

      expect(await carsController.updateCar({ id: 'test' }, {})).toBe(testCar);
    });
  });

  describe('deleteCar', () => {
    it('should delete car', async () => {
      jest
        .spyOn(carService, 'deleteCar')
        .mockImplementation(() => Promise.resolve());

      expect(await carsController.deleteCar({ id: 'test' })).toBeUndefined();
    });
  });

  describe('fetchCarManufacturer', () => {
    it('should return manufacturer', async () => {
      const testManufacturer = {
        id: 'test',
      } as Manufacturer;

      jest
        .spyOn(carService, 'findCarManufacturer')
        .mockImplementation(() => Promise.resolve(testManufacturer));

      expect(await carsController.fetchCarManufacturer({ id: 'test' })).toBe(
        testManufacturer,
      );
    });
  });
});
