import { IsNumber, IsString } from 'class-validator';

export class CreateManufacturerDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly phone: string;

  @IsNumber()
  readonly siret: number;
}
