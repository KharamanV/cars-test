import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import { Manufacturer } from '../src/modules/manufacturers';

describe('Manufacturers (e2e)', () => {
  let app: INestApplication;
  let manufacturerRepository: Repository<Manufacturer>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    manufacturerRepository = module.get<Repository<Manufacturer>>(
      'ManufacturerRepository',
    );

    return app.init();
  });

  beforeEach(() => manufacturerRepository.query('DELETE FROM manufacturers'));

  it('[GET]: /manufacturers', async () => {
    const testManufacturer = await manufacturerRepository.save(
      manufacturerRepository.create({
        name: 'BMW',
        phone: '123',
        siret: 123123,
      }),
    );

    const { body } = await request(app.getHttpServer())
      .get('/manufacturers')
      .expect(200);

    expect(body).toEqual([
      {
        id: expect.any(String),
        ...testManufacturer,
      },
    ]);
  });

  it('[POST]: /manufacturers', async () => {
    const testManufacturer = {
      name: 'BMW',
      phone: '123',
      siret: 123123,
    };

    const { body } = await request(app.getHttpServer())
      .post('/manufacturers')
      .send(testManufacturer)
      .expect(201);

    expect(body).toEqual({
      id: expect.any(String),
      ...testManufacturer,
    });
  });

  afterAll(async () => {
    await app.close();

    return manufacturerRepository.query('DELETE FROM manufacturers');
  });
});
