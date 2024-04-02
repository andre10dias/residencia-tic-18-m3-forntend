import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { SuinoService } from '../../service/suino.service';
import { SuinoFormComponent } from './suino-form/suino-form.component';
import { ActionEnum } from '../../enum/action.enum';
import { TimeoutConfigEnum } from '../../enum/timeout.config.enum';
import { Suino } from '../../model/suino/suino';

@Component({
  selector: 'app-suino',
  templateUrl: './suino.component.html',
  styleUrl: './suino.component.css'
})
export class SuinoComponent {
  spinner: boolean = false;
  listaSuinos: Suino[] = [];

  constructor(
    private service: SuinoService,
    public dialog: MatDialog
  ) {
    
  }
  
  openDialog(element?: any): void {
    const dialogRef = this.dialog.open(SuinoFormComponent, {
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
        this.service.novoSuinoAdicionado();
  
        setTimeout(() => {
          this.spinner = false;
        }, TimeoutConfigEnum.CLOSE_DIALOG_DURATION);
      }
    });
  }

}
