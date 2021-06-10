import { HttpStatus } from '@nestjs/common';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ProductCreateDto } from './dtos/create-product.dto';
import { ProductUpdateDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('admin/product')
  async all() {
    return this.productService.find({});
  }

  @Get('admin/product/:id')
  async findById(@Param('id') id: number) {
    return this.productService.findOne({ id });
  }

  @Post('admin/product')
  async create(@Body() productCreateDto: ProductCreateDto) {
    return this.productService.save(productCreateDto);
  }

  @Put('admin/product/:id')
  async update(
    @Body() productUpdateDto: ProductUpdateDto,
    @Param('id') id: number,
  ) {
    await this.productService.update(id, productUpdateDto);
    return await this.productService.findOne({ id });
  }

  @Delete('admin/product/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number) {
    await this.productService.delete(id);
  }
}
