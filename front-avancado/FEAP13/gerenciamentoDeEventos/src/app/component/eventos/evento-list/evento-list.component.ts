import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { eventosStore } from '../../store/evento.store';
import { Evento } from '../../../model/evento';

import { MatDialog } from '@angular/material/dialog';
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
import { DialogComponent } from '../../dialog/dialog.component';

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
  providers: [
    DatePipe,
  ],
  templateUrl: './evento-list.component.html',
  styleUrl: './evento-list.component.css'
})
export class EventoListComponent {
  displayedColumns: string[] = ['nome', 'data', 'horario', 'local', 'action'];

  title: string = 'Excluir evento';

  eventoSelecionado: Evento = {} as Evento;
  readonly storeEvento = inject(eventosStore);

  constructor(
    private service: EventoService,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  atualizarEvento(evento: Evento) {
    this.eventoSelecionado = { ...evento };
    this.openDialog(this.eventoSelecionado);
  }

  async removerEvento(id: string): Promise<void> {
    const index = this.storeEvento.eventos().findIndex(item => item.id === id);

    if (index !== -1) {
      this.service.delete(id);
    }
  }

  formatarData(event: Event): void {
    const input = event.target as HTMLInputElement;
    const formattedDate = this.datePipe.transform(input.value, 'dd/MM/yyyy');
    if (formattedDate) {
      input.value = formattedDate;
    }
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

  openConfirmDialog(
    element?: any, 
    template: string = `<div>Deseja realmente remover o evento ${element.nome}?</div>`, 
    title: string = this.title
  ): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      disableClose: true,
      data: {title, template, element}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removerEvento(element.id);
      }
    });
  }

}
