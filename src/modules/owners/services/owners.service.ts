import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Owner } from '../entities';

@Injectable()
export class OwnersService {
  private MONTH_MS = 1000 * 60 * 60 * 24 * 30;

  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

  async removeOldOwners() {
    const owners = await this.ownerRepository.find({
      purchaseDate: LessThan(new Date(Date.now() - this.MONTH_MS * 18)),
    });

    return this.ownerRepository.remove(owners);
  }
}
