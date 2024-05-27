import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ShoppingCartService {
  constructor(private prisma: PrismaService) {}

  // Adiciona item ao carrinho ou cria o carrinho caso nao exista ainda
  async addItemToCart(userId: string, productId: string) {
    // Acha o carrinho do usuario
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { products: true },
    });

    // Cria carrinho caso nao exista
    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          user: { connect: { id: userId } },
        },
        include: { products: true },
      });
    }

    // Procura produto no carrinho
    const existingProduct = await this.prisma.cartProduct.findUnique({
      where: {
        cartId_productId: { cartId: cart.id, productId },
      },
    });

    if (existingProduct) {
      // Se já existir aumenta a quantidade, se nao existir adiciona com qtd 1
      await this.prisma.cartProduct.update({
        where: {
          cartId_productId: { cartId: cart.id, productId },
        },
        data: { quantity: existingProduct.quantity + 1 },
      });
    } else {
      await this.prisma.cartProduct.create({
        data: {
          cartId: cart.id,
          productId,
          quantity: 1,
        },
      });
    }

    // Retorna o carrinho atualizado
    cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { products: { include: { product: true } } },
    });

    return cart;
  }

  //Retorna o carrinho do usuário
  async getCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { products: { include: { product: true } } },
    });

    if (!cart) {
      throw new Error('Carrinho não existe');
    }
    return cart;
  }

  // Finaliza a compra, retornando a lista de itens e o preço total da compra
  async buyCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { products: { include: { product: true } } },
    });

    if (!cart || cart.products.length === 0) {
      throw new Error('Carrinho está vazio ou não existe');
    }

    const totalPrice = cart.products.reduce(
      (total, cartProduct) =>
        total + cartProduct.product.price * cartProduct.quantity,
      0,
    );
    const items = cart.products.map((cartProduct) => ({
      ...cartProduct.product,
      quantity: cartProduct.quantity,
    }));

    // Limpa o carrinho
    await this.prisma.cartProduct.deleteMany({
      where: { cartId: cart.id },
    });

    return { items, totalPrice };
  }

  // Decrementa qtd do produto, caso seja 1 remove do carrinho
  async removeItemFromCart(userId: string, productId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new Error('Carrinho não existe');
    }

    const cartProduct = await this.prisma.cartProduct.findUnique({
      where: {
        cartId_productId: { cartId: cart.id, productId },
      },
    });

    if (!cartProduct) {
      throw new Error('Produto não está no carrinho.');
    }

    if (cartProduct.quantity > 1) {
      // Decrementa se for menor que 1
      await this.prisma.cartProduct.update({
        where: {
          cartId_productId: { cartId: cart.id, productId },
        },
        data: { quantity: cartProduct.quantity - 1 },
      });
    } else {
      // Remove se for igual a 1
      await this.prisma.cartProduct.delete({
        where: {
          cartId_productId: { cartId: cart.id, productId },
        },
      });
    }

    // Retorna o carrinho atualizado
    const updatedCart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { products: { include: { product: true } } },
    });

    return updatedCart;
  }

  // Limpa o carrinho
  async clearCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new Error('Carrinho não existe');
    }

    await this.prisma.cartProduct.deleteMany({
      where: { cartId: cart.id },
    });

    return 'Todos os produtos foram removidos do carrinho';
  }
}
