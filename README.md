## Description

### Esta aplicação consiste em uma API para gerenciar produtos, usuários e carrinhos de compras em um sistema de e-commerce. Foi utilizado Nest.JS e Prisma.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


# Estrutura de Rotas
Módulo de Produtos (products/)
  
 @Post /products:
  
    Criar produtos, recebendo no body da requisição as informações associadas ao produto (nome, descrição (opcional) e preço).
  
  @Get /products :
    
    Receber uma lista de todos os produtos cadastrados.
  
  @Get /products/by-ids?ids=id1,id2,id3:
    
    Retornar um ou mais produtos especificados pelos seus ids.
  
  @Get /products/search/:palavrachave :
    
    Procurar produtos que correspondem a uma palavra chave.
  
  @Put /products/:id : 

    Atualizar as informações de um produto, recebendo seu id na URL e enviando um body com as informações atualizadas.
  
  @Delete /products/:id:


    Deletar um produto de determinado id.


## Módulo de Usuários (user/)
  @Post /user:

    Adicionar usuários, recebendo no body suas informações (nome (opcional) e e-mail (único)).
  
  @Get /user:

    Receber uma lista com todos os usuários cadastrados.
  
  @Put /user/:id: 
    
    Atualizar as informações de um usuário, recebendo seu id na URL e enviando um body com as informações atualizadas.
  
  @Delete /user/:id:

    Deletar um usuário de determinado id.


## Módulo de Carrinho de Compras (shopping-cart/)

  @Post /shopping-cart/add
  Receber no body um userId e um productId e:
    
    Se não houver um carrinho associado ao usuário: criar o carrinho e adicionar o produto.
    Se já houver um carrinho: simplesmente adicionar o produto ao carrinho do usuário.
  
  @Get /shopping-cart/:userId:

    Listar todos os produtos que estão no carrinho do usuário.
  
  @Post /shopping-cart/remove
  Receber no body um userId e um productId e:
    
    Se houver mais de 1 unidade do produto no carrinho: decrementar essa quantidade em 1.
    Se houver exatamente 1 unidade do produto no carrinho: remover esse item do carrinho.
  
  @Post /shopping-cart/:userId/buy:

    Receber um id de usuário e finalizar a compra do carrinho, retornando a lista de produtos comprados e o preço final.
  
  @Delete /shopping-cart/:userId/clear:
    
    Receber um id de usuário e remover todos os produtos do carrinho, retornando uma mensagem de confirmação.




## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
