import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() data: Prisma.ProductCreateInput) {
    return this.productService.create(data);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.ProductUpdateInput,
  ) {
    return this.productService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }

  @Get('search/:name')
  async searchProductsByName(@Param('name') name: string) {
    return this.productService.searchProductsByName(name);
  }

  @Get('by-ids')
  async getProductsByIds(@Query('ids') ids: string) {
    const idsArray = ids.split(',');
    return this.productService.getProductsByIds(idsArray);
  }
}
