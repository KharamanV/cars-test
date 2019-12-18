import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities';
import { OwnersService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Owner])],
  providers: [OwnersService],
  exports: [OwnersService],
})
export class OwnersModule {}
