import { Component } from '@angular/core';
import { SuinoService } from '../../service/suino.service';
import { MatDialog } from '@angular/material/dialog';
import { ActionEnum } from '../../enum/action-enum';
import { PesoFormComponent } from './peso-form/peso-form.component';
import { PesoService } from '../../service/peso.service';

@Component({
  selector: 'app-peso',
  templateUrl: './peso.component.html',
  styleUrl: './peso.component.css'
})
export class PesoComponent {
  spinner: boolean = true;

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
        this.spinner = false;
        // console.log('[SuinoComponent] The dialog was closed');
        // console.log('[SuinoComponent] element: ', element);
        this.service.novoPesoAdicionado();
  
        setTimeout(() => {
          this.spinner = true;
        }, 1000);
      }
    });
  }

}
