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
      price: 10,
      quantity: 0,
      imgURL: './assets/img/algoritmos.jpg'
    },
    {
      id: 2,
      name: 'Estrutura de Dados e Algoritmos com Javascript',
      price: 10,
      quantity: 0,
      imgURL: './assets/img/estrutura_dados.jpg'
    },
    {
      id: 3,
      name: 'Expressões Regulares: Uma Abordagem Divertida',
      price: 10,
      quantity: 0,
      imgURL: './assets/img/expressoes_regulares.jpg'
    },
    {
      id: 4,
      name: 'Lógica de Programação e Algoritmos com Javascript',
      price: 10,
      quantity: 0,
      imgURL: './assets/img/logica_programacao.jpg'
    },
  ]

  constructor() { }

  adicionarItemCarrinho(item: Item) {
    let itemCarrinho = this.listaItemsCarrinho.find(x => x.id == item.id);

    console.log(itemCarrinho);
    console.log(item);

    if (itemCarrinho) {
        // Se o item já estiver no carrinho, adicione apenas a quantidade do item
        itemCarrinho.quantity += item.quantity;
    } 
    else {
        item.quantity = 1;
        this.listaItemsCarrinho.push({ ...item, quantity: item.quantity });
    }
  }



}
