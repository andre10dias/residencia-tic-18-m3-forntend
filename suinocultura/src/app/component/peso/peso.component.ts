import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PesoService } from '../../service/peso.service';

import { ActionEnum } from '../../enum/action.enum';
import { TimeoutConfigEnum } from '../../enum/timeout.config.enum';

import { PesoFormComponent } from './peso-form/peso-form.component';

@Component({
  selector: 'app-peso',
  templateUrl: './peso.component.html',
  styleUrl: './peso.component.css'
})
export class PesoComponent {
  spinner: boolean = false;

  constructor(
    private service: PesoService,
    public dialog: MatDialog
  ) {
  }
  
  openDialog(element?: any): void {
    const dialogRef = this.dialog.open(PesoFormComponent, {
      width: '600px',
      disableClose: true,
      data: { 
        element: element, 
        action: ActionEnum.CREATE, 
        title: 'Cadastrar Suino', 
        txtButton: 'Cadastrar' 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinner = true;
        // console.log('[SuinoComponent] The dialog was closed');
        // console.log('[SuinoComponent] element: ', element);
        this.service.novoPesoAdicionado();
  
        setTimeout(() => {
          this.spinner = false;
        }, TimeoutConfigEnum.CLOSE_DIALOG_DURATION);
      }
    });
  }

}
