import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuinoComponent } from './component/suino/suino.component';
import { PesoComponent } from './component/peso/peso.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { SuinoGuard } from './guard/suino.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [SuinoGuard]  },
  { path: 'suino', component: SuinoComponent, canActivate: [SuinoGuard]  },
  { path: 'peso', component: PesoComponent, canActivate: [SuinoGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
