import { Injectable } from '@angular/core';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  listaQtdes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  listaItemsCarrinho: Item[] = [];
  listaItems: Item[] = [
    {
      id: 1,
      name: 'Entendendo Algoritmos: Um guia ilustrado para programação',
      price: 63.80,
      quantity: 0,
      imgURL: './assets/img/algoritmos.jpg'
    },
    {
      id: 2,
      name: 'Estrutura de Dados e Algoritmos com Javascript',
      price: 92.70,
      quantity: 0,
      imgURL: './assets/img/estrutura_dados.jpg'
    },
    {
      id: 3,
      name: 'Expressões Regulares: Uma Abordagem Divertida',
      price: 59.59,
      quantity: 0,
      imgURL: './assets/img/expressoes_regulares.jpg'
    },
    {
      id: 4,
      name: 'Lógica de Programação e Algoritmos com Javascript',
      price: 75.70,
      quantity: 0,
      imgURL: './assets/img/logica_programacao.jpg'
    },
  ]

  constructor() { }

  adicionarItemCarrinho(item: Item) {
    let itemCarrinho = this.listaItemsCarrinho.find(x => x.id == item.id);

    if (itemCarrinho) {
        itemCarrinho.quantity += item.quantity;
        // console.log('Item no carrinho: ', itemCarrinho);
        // console.log('Item adicionado: ', item);
    } 
    else {
        item.quantity = 1;
        this.listaItemsCarrinho.push({ ...item, quantity: item.quantity });
        // console.log('Item no carrinho: ', itemCarrinho);
        // console.log('Item adicionado: ', item);
    }
  }

  excluirItemCarrinho(item: Item) {
    const index = this.listaItemsCarrinho.findIndex(x => x.id === item.id);
    if (index !== -1) {
        this.listaItemsCarrinho.splice(index, 1);
    }
  }

}
