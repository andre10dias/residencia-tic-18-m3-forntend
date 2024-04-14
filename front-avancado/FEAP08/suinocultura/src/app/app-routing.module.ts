import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuinoComponent } from './component/suino/suino.component';
import { PesoComponent } from './component/peso/peso.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { SuinoGuard } from './guard/suino.guard';
import { SessaoComponent } from './component/sessao/sessao.component';
import { HistoricoAnimalComponent } from './component/historico-animal/historico-animal.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [SuinoGuard] },
  { path: 'suino', component: SuinoComponent, canActivate: [SuinoGuard] },
  { path: 'peso', component: PesoComponent, canActivate: [SuinoGuard] },
  { path: 'sessao', component: SessaoComponent, canActivate: [SuinoGuard] },
  { path: 'historicoAnimal', component: HistoricoAnimalComponent, canActivate: [SuinoGuard] },
  // { path: 'home', component: HomeComponent },
  // { path: 'suino', component: SuinoComponent },
  // { path: 'peso', component: PesoComponent },
  // { path: 'sessao', component: SessaoComponent },
  // { path: 'historicoAnimal', component: HistoricoAnimalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
