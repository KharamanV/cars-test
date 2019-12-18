import { IsDateString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateCarDto {
  @IsUUID()
  @IsOptional()
  readonly manufacturerId?: string;

  @IsNumber()
  @IsOptional()
  readonly price?: number;

  @IsDateString()
  @IsOptional()
  readonly firstRegistrationDate?: Date;
}
