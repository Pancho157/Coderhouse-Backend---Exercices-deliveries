import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { Product } from './interfaces/products-interfaces';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<Promise<Product>[]> {
    return await this.productsService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id): Promise<Product> {
    id = parseInt(id);
    return await this.productsService.getById(id);
  }

  @Post()
  @HttpCode(201)
  async addProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  @Put('/:id')
  async update(
    @Param('id') id,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    id = parseInt(id);
    return await this.productsService.update(id, updateProductDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id): Promise<Product> {
    return await this.productsService.delete(id);
  }
}
