import { PartialType } from '@nestjs/mapped-types';
import { CreateProductRequest } from './create-product.dto';

export class UpdateProductRequest extends PartialType(CreateProductRequest) {}
