import { IsUUID } from 'class-validator';

export class CarIdParams {
  @IsUUID()
  readonly id: string;
}
