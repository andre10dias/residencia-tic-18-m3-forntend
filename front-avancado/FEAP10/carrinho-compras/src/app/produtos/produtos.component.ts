import { Component, computed, effect, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from '../model/item';
import { CarrinhoService } from '../service/carrinho.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {
  listaItensCarrinho = signal<Item[]>([]);
  listaItens = signal<Item[]>([]);
  quantidades = signal<number[]>([]);
  total = signal<number>(0);

  constructor(
    private service: CarrinhoService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.listaItens.set(this.service.listaItems);
    this.quantidades.set(this.service.listaQtdes);
  }

  updateQuantity(item: Item, quantity: number): void {
    item.quantity = quantity;
    // this.calcularTotal();
  }

  // calcularTotal(): void {
  //   const items = this.listaItensCarrinho();
  //   this.total.set(items.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0));
  // }

  add(item: Item) {
    this.service.adicionarItemCarrinho(item);
    this.openSnackBar();
  }

  carrinho() {
    this.router.navigate(['/carrinho']);
  }

  openSnackBar (msg: string = 'Item adicionado!'): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

}
