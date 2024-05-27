import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new Error('user already exists');
    }

    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error('user does not exists!');
    }

    return await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error('user does not exists!');
    }

    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
