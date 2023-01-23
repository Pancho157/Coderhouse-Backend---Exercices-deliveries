import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';

@Injectable()
export class ProductsService {
  delete(id: number) {
    return id;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return { id, updateProductDto };
  }

  create(createProductDto: CreateProductDto) {
    return createProductDto;
  }

  getHello(): string {
    return 'Hola mundo';
  }
}
