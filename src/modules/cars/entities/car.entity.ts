import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  AfterLoad,
} from 'typeorm';
import { Manufacturer } from '../../manufacturers';
import { Owner } from '../../owners';
import { DiscountService } from '../services';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  price: number;

  @Column()
  firstRegistrationDate: Date;

  @ManyToOne(
    type => Manufacturer,
    manufacturer => manufacturer.cars,
    {
      eager: true,
      onDelete: 'CASCADE',
      cascade: true,
    },
  )
  manufacturer: Manufacturer;

  @OneToMany(
    type => Owner,
    owner => owner.car,
    {
      eager: true,
    },
  )
  owners: Owner[];

  @Column({ type: 'float', nullable: true })
  discount: number | null;

  @AfterLoad()
  addDiscount() {
    if (!this.discount) {
      this.discount = DiscountService.getDiscount(this.firstRegistrationDate);
    }
  }
}
