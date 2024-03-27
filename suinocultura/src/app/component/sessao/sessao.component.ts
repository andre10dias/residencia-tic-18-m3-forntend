import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { SessaoService } from '../../service/sessao.service';

import { ActionEnum } from '../../enum/action.enum';

import { SessaoFormComponent } from './sessao-form/sessao-form.component';

@Component({
  selector: 'app-sessao',
  templateUrl: './sessao.component.html',
  styleUrl: './sessao.component.css'
})
export class SessaoComponent {
  spinner: boolean = true;

  constructor(
    private service: SessaoService,
    public dialog: MatDialog
  ) {
  }

  openDialog(element?: any): void {
    const dialogRef = this.dialog.open(SessaoFormComponent, {
      width: '600px',
      disableClose: true,
      data: { 
        element: element, 
        action: ActionEnum.CREATE, 
        title: 'Cadastrar Sessão', 
        txtButton: 'Cadastrar' 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinner = false;
        // console.log('[SuinoComponent] The dialog was closed');
        // console.log('[SuinoComponent] element: ', element);
        this.service.novaSessaoAdicionada();
  
        setTimeout(() => {
          this.spinner = true;
        }, 1000);
      }
    });
  }

}
