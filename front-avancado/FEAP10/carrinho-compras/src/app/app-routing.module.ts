import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'produtos' },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'carrinho', component: CarrinhoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
