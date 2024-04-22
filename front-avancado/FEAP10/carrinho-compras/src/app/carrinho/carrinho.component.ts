import { Component, computed, effect, signal, OnInit } from '@angular/core';
import { Item } from '../model/item';
import { CarrinhoService } from '../service/carrinho.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  listaItensCarrinho = signal<Item[]>([]);
  quantidades = signal<number[]>([]);
  qtdeItens: string = '';
  total = signal<number>(0);

  constructor(
    private service: CarrinhoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listaItensCarrinho.set(this.service.listaItemsCarrinho);
    this.quantidades.set(this.service.listaQtdes);

    this.calcularTotal();
  }

  desmarcarTodos(): void {
    this.listaItensCarrinho().forEach(item => {
      this.updateCheckbox(item, false);
    });
  }

  excluir(item: Item): void {
    this.service.excluirItemCarrinho(item);
    this.calcularTotal();
  }

  updateCheckbox(item: Item, isChecked: boolean) {
    item.quantity = isChecked ? 1 : 0;
    this.calcularTotal();
  }

  calcularTotal(): void {
    const items = this.listaItensCarrinho();
    this.total.set(items.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0));
    this.updateQtdes(items);
  }

  updateQuantity(item: Item, quantity: number): void {
    item.quantity = quantity;
    this.calcularTotal();
  }

  updateQtdes(items: Item[]): void {
    const item = items.reduce((acc: any, item: any) => acc + item.quantity, 0);      
    this.qtdeItens = item > 0 ? `(${item} produtos): ` : '';
  }

  produtos() {
    this.router.navigate(['/produtos']);
  }

}
