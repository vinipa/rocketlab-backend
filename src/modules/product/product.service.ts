import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProductUncheckedCreateInput) {
    const product = await this.prisma.product.create({
      data,
    });

    return product;
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async searchProductsByName(name: string) {
    return this.prisma.product.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  async getProductsByIds(ids: string[]) {
    return this.prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async update(id: string, data: Prisma.ProductUpdateInput) {
    const productExists = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!productExists) {
      throw new Error('Product does not exists!');
    }

    return await this.prisma.product.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const productExists = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!productExists) {
      throw new Error('Product does not exists!');
    }

    return await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
