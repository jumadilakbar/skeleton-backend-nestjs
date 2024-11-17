import { Controller, Get, Param, Query } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('products')
  findAll() {
    return this.publicService.findAll();
  }

  @Get('products/:id')
  findById(@Param('id') id: string) {
    return this.publicService.findOne(+id);
  }

  @Get('products/search')
  search(@Query('term') term: string) {
    return this.publicService.search(term);
  }
}
