import { IsNotEmpty } from 'class-validator';

export class CreateProductRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  uom: string;

  description: string;
}
