import { Module } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';

@Module({
  providers: [PublicService, ProductService],
  controllers: [PublicController],
})
export class PublicModule {}
