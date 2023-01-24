import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { Product } from './interfaces/products-interfaces';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async getAll(): Promise<Promise<Product>[]> {
    return await this.productModel.find();
  }

  async getById(id): Promise<Product> {
    return await this.productModel.findById(id);
  }

  async create(createProductDto: CreateProductDto) {
    return await this.productModel.create(createProductDto);
  }
  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  async delete(id: number): Promise<Product> {
    return await this.productModel.findOneAndDelete({ id });
  }
}
