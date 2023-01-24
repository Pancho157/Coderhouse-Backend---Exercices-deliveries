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
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.getAll();
  }

  @Post()
  @HttpCode(201)
  addProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put('/:id')
  update(@Param('id') id, @Body() updateProductDto: UpdateProductDto) {
    id = parseInt(id);
    return this.productsService.update(id, updateProductDto);
  }

  @Delete('/:id')
  delete(@Param('id') id) {
    return this.productsService.delete(id);
  }
}
