import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';

@Injectable()
export class ProductsService {
  getAll() {
    return 'Hola mundo';
  }

  create(createProductDto: CreateProductDto) {
    return createProductDto;
  }
  update(id: number, updateProductDto: UpdateProductDto) {
    return { id, updateProductDto };
  }

  delete(id: number) {
    return id;
  }
}
