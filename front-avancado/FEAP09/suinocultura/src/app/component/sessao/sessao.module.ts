import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { AppRoutingModule } from '../../app-routing.module';

import { SessaoComponent } from './sessao.component';
import { SessaoListComponent } from './sessao-list/sessao-list.component';
import { SessaoFormComponent } from './sessao-form/sessao-form.component';
import { SessaoHistoricoComponent } from './sessao-historico/sessao-historico.component';
import { SessaoHistoricoGraficoComponent } from './sessao-historico-grafico/sessao-historico-grafico.component';

@NgModule({
  declarations: [
    SessaoComponent,
    SessaoListComponent,
    SessaoFormComponent,
    SessaoHistoricoComponent,
    SessaoHistoricoGraficoComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    SessaoComponent
  ]
})
export class SessaoModule { }
