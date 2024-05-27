import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Post('add')
  async addItemToCart(@Body() body: { userId: string; productId: string }) {
    const { userId, productId } = body;
    return await this.shoppingCartService.addItemToCart(userId, productId);
  }

  @Post(':userId/buy')
  async buyCart(@Param('userId') userId: string) {
    return await this.shoppingCartService.buyCart(userId);
  }

  @Delete('remove')
  async removeItemFromCart(
    @Body() body: { userId: string; productId: string },
  ) {
    const { userId, productId } = body;
    return await this.shoppingCartService.removeItemFromCart(userId, productId);
  }

  @Delete(':userId/clear')
  async clearCart(@Param('userId') userId: string) {
    return await this.shoppingCartService.clearCart(userId);
  }

  @Get(':userId')
  async getCart(@Param('userId') userId: string) {
    return await this.shoppingCartService.getCart(userId);
  }
}
