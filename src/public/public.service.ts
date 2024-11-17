import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class PublicService {
  constructor(private productService: ProductService) {}

  public findAll() {
    return this.productService.findAll();
  }

  public findOne(id: number) {
    return this.productService.findOne(id);
  }

  public search(term: string) {
    return this.productService.search(term);
  }
}
