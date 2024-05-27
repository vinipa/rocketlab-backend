import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService, PrismaService],
})
export class ShoppingCartModule {}
