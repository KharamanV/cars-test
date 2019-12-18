import { IsDateString, IsNumber, IsUUID } from 'class-validator';

export class CreateCarDto {
  @IsUUID()
  readonly manufacturerId: string;

  @IsNumber()
  readonly price: number;

  @IsDateString()
  readonly firstRegistrationDate: Date;
}
