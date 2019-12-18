import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Car } from '../../cars';

@Entity('owners')
export class Owner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  purchaseDate: Date;

  @ManyToOne(
    type => Car,
    car => car.owners,
  )
  car: Car;
}
