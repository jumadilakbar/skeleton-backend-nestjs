import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductRequest } from './dto/create-product.dto';
import { UpdateProductRequest } from './dto/update-product.dto';
import { JWT } from 'src/auth/jwt.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JWT)
  create(@Body() input: CreateProductRequest) {
    return this.productService.create(input);
  }

  @Get()
  @UseGuards(JWT)
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(JWT)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JWT)
  update(@Param('id') id: string, @Body() input: UpdateProductRequest) {
    return this.productService.update(+id, input);
  }

  @Delete(':id')
  @UseGuards(JWT)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
