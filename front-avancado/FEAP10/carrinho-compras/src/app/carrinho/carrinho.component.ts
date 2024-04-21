import { Component, computed, effect, signal, OnInit } from '@angular/core';
import { Item } from '../model/item';
import { CarrinhoService } from '../service/carrinho.service';
import writableSignal from 's-js';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  listaItens = signal<Item[]>([]);
  quantidades = signal<number[]>([]);
  qtdeItens: string = '';
  total = writableSignal<number>(0);

  constructor(private service: CarrinhoService) {}

  ngOnInit(): void {
    this.listaItens.set(this.service.listaItems);
    this.quantidades.set(this.service.listaQtdes);

    this.calcularTotal();
  }

  calcularTotal(): void {
    this.total = computed(() => {
      const items = this.listaItens();
      return items.reduce((acc: any, item: any) => acc + item.price, 0);
    }); 
  }
  

  updateQuantity(item: Item, quantity: number): void {
    item.quantity = quantity;
    this.calcularTotal();
  }
}
