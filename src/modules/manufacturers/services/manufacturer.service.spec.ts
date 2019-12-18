import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManufacturerService } from '../../manufacturers';
import { Manufacturer } from '../entities';

describe('Manufacturer Service', () => {
  let manufacturerService: ManufacturerService;
  let manufacturerRepo: Repository<Manufacturer>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ManufacturerService,
        {
          provide: getRepositoryToken(Manufacturer),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    manufacturerService = module.get<ManufacturerService>(ManufacturerService);
    manufacturerRepo = module.get<Repository<Manufacturer>>(
      'ManufacturerRepository',
    );
  });

  it('should be defined', () => {
    expect(manufacturerService).toBeDefined();
    expect(manufacturerRepo).toBeDefined();
  });

  describe('findOne', () => {
    it('should return manufacturer', async () => {
      const manufacturer = {
        phone: '123123',
        name: 'asdasd',
        siret: 123,
        id: 'qweq',
        cars: [],
      };
      jest
        .spyOn(manufacturerRepo, 'findOne')
        .mockImplementation(() => Promise.resolve(manufacturer));

      expect(await manufacturerService.findOne('test')).toEqual(manufacturer);
    });
  });
});
