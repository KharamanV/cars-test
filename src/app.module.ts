import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Car, CarsModule } from './modules/cars';
import { Owner, OwnersModule } from './modules/owners';
import { Manufacturer } from './modules/manufacturers';
import { ScheduleService } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      entities: [Car, Owner, Manufacturer],
    }),
    CarsModule,
    OwnersModule,
  ],
  providers: [ScheduleService],
})
export class AppModule {}
