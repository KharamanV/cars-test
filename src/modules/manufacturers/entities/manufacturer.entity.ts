import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Car } from '../../cars';

@Entity('manufacturers')
export class Manufacturer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  siret: number;

  @OneToMany(
    type => Car,
    car => car.manufacturer,
  )
  cars: Car[];
}
