import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { Car } from '../src/modules/cars';
import { Manufacturer } from '../src/modules/manufacturers';

describe('Cars (e2e)', () => {
  let app: INestApplication;
  let carRepository: Repository<Car>;
  let manufacturerRepository: Repository<Manufacturer>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    carRepository = module.get<Repository<Car>>('CarRepository');
    manufacturerRepository = module.get<Repository<Manufacturer>>(
      'ManufacturerRepository',
    );

    return app.init();
  });

  beforeEach(() =>
    Promise.all([
      carRepository.query('DELETE FROM cars'),
      manufacturerRepository.query('DELETE FROM manufacturers'),
    ]),
  );

  it('[GET]: /cars', async () => {
    const testManufacturer = await manufacturerRepository.save(
      manufacturerRepository.create({
        name: 'BMW',
        phone: '123',
        siret: 123123,
      }),
    );
    const testCar = await carRepository.save(
      carRepository.create({
        manufacturer: testManufacturer,
        price: 333,
        firstRegistrationDate: new Date(),
      }),
    );

    const { body } = await request(app.getHttpServer())
      .get('/cars')
      .expect(200);

    expect(body).toEqual([
      {
        ...testCar,
        firstRegistrationDate: expect.any(String),
        discount: null,
        manufacturer: testManufacturer,
        owners: [],
      },
    ]);
  });

  it('[GET]: /cars/:id', async () => {
    const testManufacturer = await manufacturerRepository.save(
      manufacturerRepository.create({
        name: 'BMW',
        phone: '123',
        siret: 123123,
      }),
    );
    const testCar = await carRepository.save(
      carRepository.create({
        manufacturer: testManufacturer,
        price: 333,
        firstRegistrationDate: new Date(),
      }),
    );

    const { body } = await request(app.getHttpServer())
      .get(`/cars/${testCar.id}`)
      .expect(200);

    expect(body).toEqual({
      ...testCar,
      firstRegistrationDate: expect.any(String),
      discount: null,
      manufacturer: testManufacturer,
      owners: [],
    });
  });

  it('[POST]: /cars', async () => {
    const testManufacturer = await manufacturerRepository.save(
      manufacturerRepository.create({
        name: 'BMW',
        phone: '123',
        siret: 123123,
      }),
    );
    const car = {
      manufacturerId: testManufacturer.id,
      price: 333,
      firstRegistrationDate: new Date(),
    };

    const { body } = await request(app.getHttpServer())
      .post(`/cars`)
      .send(car)
      .expect(201);

    expect(body).toEqual({
      id: expect.any(String),
      price: car.price,
      firstRegistrationDate: expect.any(String),
      discount: null,
      manufacturer: { ...testManufacturer },
    });
  });

  it('[PATCH]: /cars/:id', async () => {
    const testManufacturer = await manufacturerRepository.save(
      manufacturerRepository.create({
        name: 'BMW',
        phone: '123',
        siret: 123123,
      }),
    );
    const testCar = await carRepository.save(
      carRepository.create({
        manufacturer: testManufacturer,
        price: 333,
        firstRegistrationDate: new Date(),
      }),
    );
    const newPrice = 1000;

    const { body } = await request(app.getHttpServer())
      .patch(`/cars/${testCar.id}`)
      .send({ price: newPrice })
      .expect(200);

    expect(body.price).toEqual(newPrice);
  });

  it('[DELETE]: /cars/:id', async () => {
    const testManufacturer = await manufacturerRepository.save(
      manufacturerRepository.create({
        name: 'BMW',
        phone: '123',
        siret: 123123,
      }),
    );
    const testCar = await carRepository.save(
      carRepository.create({
        manufacturer: testManufacturer,
        price: 333,
        firstRegistrationDate: new Date(),
      }),
    );

    expect(await carRepository.findOne(testCar.id)).toBeTruthy();

    await request(app.getHttpServer())
      .delete(`/cars/${testCar.id}`)
      .expect(200);

    expect(await carRepository.findOne(testCar.id)).toBeUndefined();
  });

  it('[GET]: /cars/:id/manufacturer', async () => {
    const testManufacturer = await manufacturerRepository.save(
      manufacturerRepository.create({
        name: 'BMW',
        phone: '123',
        siret: 123123,
      }),
    );
    const testCar = await carRepository.save(
      carRepository.create({
        manufacturer: testManufacturer,
        price: 333,
        firstRegistrationDate: new Date(),
      }),
    );

    const { body } = await request(app.getHttpServer())
      .get(`/cars/${testCar.id}/manufacturer`)
      .expect(200);

    expect(body).toEqual(testManufacturer);
  });

  it('should add discount to old car', async () => {
    const testManufacturer = await manufacturerRepository.save(
      manufacturerRepository.create({
        name: 'BMW',
        phone: '123',
        siret: 123123,
      }),
    );
    const yearAgoDate = new Date();

    yearAgoDate.setFullYear(yearAgoDate.getFullYear() - 1);

    const testCar = await carRepository.save(
      carRepository.create({
        manufacturer: testManufacturer,
        price: 333,
        firstRegistrationDate: yearAgoDate,
      }),
    );

    const { body } = await request(app.getHttpServer())
      .get(`/cars/${testCar.id}`)
      .expect(200);

    expect(body.discount).toEqual(0.2);
  });

  afterAll(async () => {
    await app.close();

    return Promise.all([
      carRepository.query('DELETE FROM cars'),
      manufacturerRepository.query('DELETE FROM manufacturers'),
    ]);
  });
});
