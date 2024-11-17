import { Injectable } from '@nestjs/common';
import { responseMessages, successResponse } from 'src/helpers/api-response';
import { Connection, getRepository, Repository } from 'typeorm';
import { CreateProductRequest } from './dto/create-product.dto';
import { UpdateProductRequest } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  private productRepo: Repository<Product>;
  constructor(private connection: Connection) {
    this.productRepo = this.connection.getRepository(Product);
  }

  async create(input: CreateProductRequest) {
    const product = new Product();
    product.name = input.name;
    product.price = input.price;
    product.uom = input.uom;
    product.description = input.description;
    return await this.productRepo
      .save(product)
      .then((res) =>
        successResponse({
          code: 200,
          message: responseMessages.createSuccess,
          data: res,
        }),
      )
      .catch((err) => err);
  }

  async findAll() {
    return await this.productRepo
      .find()
      .then((res) =>
        successResponse({
          code: 200,
          message: responseMessages.success,
          data: res,
        }),
      )
      .catch((err) => err);
  }

  async findOne(id: number) {
    return await this.productRepo
      .findOneOrFail(id)
      .then((res) =>
        successResponse({
          code: 200,
          message: responseMessages.success,
          data: res,
        }),
      )
      .catch((err) => err);
  }

  async update(id: number, input: UpdateProductRequest) {
    const product = await this.findOne(id);

    const newProduct = new Product();
    newProduct.name = input.name || product.name;
    newProduct.price = input.price || product.price;
    newProduct.uom = input.uom || product.uom;
    newProduct.description = input.description || product.description;

    return await this.productRepo
      .update(id, newProduct)
      .then(() =>
        successResponse({
          code: 200,
          message: responseMessages.updateSuccess,
          data: newProduct,
        }),
      )
      .catch((err) => err);
  }

  async remove(id: number) {
    return await this.productRepo
      .delete(id)
      .then(() =>
        successResponse({
          code: 200,
          message: responseMessages.deleteSuccess,
          data: '',
        }),
      )
      .catch((err) => err);
  }

  async search(term: string) {
    return await getRepository(Product)
      .createQueryBuilder('product')
      .where('LOWER(product.name) like LOWER(:name)', { name: `%${term}%` })
      .getMany()
      .then((res) =>
        successResponse({
          code: 200,
          message: responseMessages.success,
          data: res,
        }),
      )
      .catch((err) => err);
  }
}
