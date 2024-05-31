import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { eventosStore } from '../../store/evento.store';
import { Evento } from '../../../model/evento';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
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
import {MatExpansionModule} from '@angular/material/expansion';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { EventoFormComponent } from '../evento-form/evento-form.component';
import { ActionEnum } from '../../../enum/action.enum';
import { EventoService } from '../../../service/evento.service';

@Component({
  selector: 'app-evento-list',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './evento-list.component.html',
  styleUrl: './evento-list.component.css'
})
export class EventoListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'data', 'horario', 'local', 'action'];

  dataSource = new MatTableDataSource<Evento>();

  title: string = 'Excluir evento';
  removeTemplate: string = '<div>Tem certeza que deseja remover?</div>';

  eventoSelecionado: Evento = {} as Evento;
  readonly storeEvento = inject(eventosStore);

  constructor(
    private service: EventoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarEventos();
  }

  carregarEventos() {
    this.service.getAll().subscribe({
      next: listaEventos => {
        listaEventos.forEach(evento => {
          this.storeEvento.adicionarEvento(evento);
        });
      },
      error: error => {
        console.error('Erro ao carregar a lista:', error);
      }
    });
  }

  // carregarEventos() {
  //   this.storeEvento.eventos().subscribe(eventos => {
  //     this.dataSource.data = eventos;
  //   });
  // }

  atualizarEvento(evento: Evento) {
    this.eventoSelecionado = { ...evento };
    this.openDialog(this.eventoSelecionado);
  }

  removerEvento(evento: Evento) {
    this.storeEvento.removerEvento(evento.codigo);
  }

  openDialog(element?: Evento): void {
    console.log('element', element);
    const dialogRef = this.dialog.open(EventoFormComponent, {
      width: '600px',
      disableClose: true,
      data: { 
        element: element, 
        action: ActionEnum.EDIT, 
        title: 'Editar suíno', 
        txtButton: 'Editar' 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The edit dialog was closed');
      }
    });
  }

  // showForm(evento: Evento) {
  //   this.eventoSelecionada = { ...evento };

  //   const formUpdate = document.getElementById('form-update');
  //   if (formUpdate) {
  //     formUpdate.style.display = 'block';
  //   }
  // }

  // atualizarEvento() {
  //   if (evento) {
      
  //   }
  //   const novaDescricao = (document.getElementById('nova-descricao') as HTMLInputElement).value;
  //   // atualizarEvento(id: string, nome: string, data: string, horario: string, local: string) {
  //   this.storeEvento.atualizarEvento(this.eventoSelecionado.id, novaDescricao);
  //   // this.hideForm();
  // }

  // hideForm() {
  //   const formUpdate = document.getElementById('form-update');

  //   if (formUpdate) {
  //     formUpdate.style.display = 'none';
  //   }
  // }

}
