import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ActionEnum } from '../../enum/action.enum';

import { EventoFormComponent } from './evento-form/evento-form.component';
import { EventoListComponent } from './evento-list/evento-list.component';
import { eventosStore } from '../store/evento.store';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    EventoListComponent
  ],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent {
  readonly storeEvento = inject(eventosStore);

  constructor(
    public dialog: MatDialog
  ) {}

  openDialog(element?: any): void {
    const dialogRef = this.dialog.open(EventoFormComponent, {
      width: '600px',
      disableClose: true,
      data: { 
        element: element, 
        action: ActionEnum.CREATE, 
        title: 'Cadastrar evento', 
        txtButton: 'Cadastrar' 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed');
      }
    });
  }

}
