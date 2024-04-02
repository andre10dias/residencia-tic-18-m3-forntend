import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { SessaoService } from '../../../service/sessao.service';
import { SuinoUtil } from '../../../util/suino.util';

import { ActionEnum } from '../../../enum/action.enum';

import { SessaoFormComponent } from '../sessao-form/sessao-form.component';
import { SessaoHistoricoComponent } from '../sessao-historico/sessao-historico.component';
import { DialogComponent } from '../../dialog/dialog.component';

import { SessaoConverter } from '../../../model/sessao/sessao.converter';
import { SessaoListDTO } from '../../../model/sessao/sessao-list.dto';
import { SessaoFormDTO } from '../../../model/sessao/sessao-form.dto';
import { Sessao } from '../../../model/sessao/sessao';
import { TimeoutConfigEnum } from '../../../enum/timeout.config.enum';

@Component({
  selector: 'app-sessao-list',
  templateUrl: './sessao-list.component.html',
  styleUrl: './sessao-list.component.css'
})
export class SessaoListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  listaSessao: SessaoListDTO[] = [];
  dadosCarregados: boolean = false;
  spinner: boolean = false;
  screenWidth: number = window.innerWidth;
  
  displayedColumns: string[] = ['descricao', 'dataSessao', 'action'];

  dataSource = new MatTableDataSource<SessaoListDTO>();
  sortedData: SessaoListDTO[] = [];

  title: string = 'Excluir atendimento';
  removeTemplate: string = '<div>Tem certeza que deseja remover?</div>';

  constructor(
    private service: SessaoService,
    private util: SuinoUtil,
    private converter: SessaoConverter,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ){
    this.carregardadosList();
  }

  ngOnInit(): void {
    this.service.novaSessaoObservable$.subscribe({
      next: (sessao: SessaoListDTO) => {
        this.dataSource.data.push(sessao);
        this.dataSource._updateChangeSubscription();
      }
    });

    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
  }

  carregardadosList(): void {
    this.service.getAll().subscribe({
      next: suimos => {
        this.listaSessao = this.converter.toListSessaoListDTOs(suimos);
        this.atualizarDadosLista(this.listaSessao);
      },
      error: error => {
        console.error('Erro ao carregar a lista:', error);
      }
    });
  }

  editItem(id: string): void {
    this.service.getSessaoById(id).subscribe(sessao => {
      if (sessao) {
        // let suinos = Array.isArray(sessao.suinos) ? sessao.suinos : [sessao.suinos];
        // let atividades = Array.isArray(sessao.atividades) ? sessao.atividades : [sessao.atividades];

        sessao.id = id;
        sessao.suinos = Array.from(new Set(sessao.suinos));
        sessao.atividades = Array.from(new Set(sessao.atividades));

        let sessaoFormDTO: SessaoFormDTO = this.converter.toSessaoFormDTO(sessao);
        this.openDialog(sessaoFormDTO);
      }
    });
  }

  atualizarDadosLista(lista: SessaoListDTO[]): void {
    this.spinnerOn();
    this.listaSessao = lista;

    this.dataSource = new MatTableDataSource<SessaoListDTO>(this.listaSessao);
    this.sortedData = this.listaSessao.slice();

    this.dataSource._updateChangeSubscription();
    
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      let label = document.querySelector('#mat-paginator-page-size-label-0') as HTMLElement;
      // let label2 = document.querySelector('.mat-mdc-paginator-range-label') as HTMLElement;
      
      if (label) {
        label.innerHTML = 'Itens por página:';
      }

      this.spinnerOff();
    }, TimeoutConfigEnum.UPDATE_LIST_DURATION);

  }

  sortData(sort: Sort) {
    // const data = this.listaSuinos.slice();
    const data = this.dataSource.data.slice();

    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'descricao':
          return this.util.compare(a.descricao, b.descricao, isAsc);
        case 'dataSessao':
          return this.util.compareDates(a.dataSessao, b.dataSessao, isAsc);
        default:
          return this.util.compareDates(a.createdAt, b.createdAt, isAsc);
      }
    });
  }

  openDialog(element?: SessaoFormDTO): void {
    const dialogRef = this.dialog.open(SessaoFormComponent, {
      width: '600px',
      disableClose: true,
      data: { 
        element: element, 
        action: ActionEnum.EDIT, 
        title: 'Editar sessão', 
        txtButton: 'Editar' 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinnerOn();
        const index = this.dataSource.data.findIndex(item => item.id === element?.id);

        if (index !== -1) {
          setTimeout(() => {
            let sessao = this.service.sessaoAtualizada;
            this.dataSource.data[index] = sessao;
            this.dataSource._updateChangeSubscription();
            this.dadosCarregados = true;
          }, TimeoutConfigEnum.CLOSE_DIALOG_DURATION);
        }

        this.spinnerOff();
      }
    });
  }

  removeItem(id: string): void {
    const index = this.dataSource.data.findIndex(item => item.id === id);

    if (index !== -1) {
      this.service.delete(id);
      this.openSnackBar();

      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }
  }

  openConfirmDialog(
    element?: any, 
    template: string = this.removeTemplate, 
    title: string = this.title
  ): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      disableClose: true,
      data: {title, template, element}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinnerOn();
        this.removeItem(element);
        this.spinnerOff();
      }
    });
  }

  openHistoricoDialog(element?: Sessao): void {
    const dialogRef = this.dialog.open(SessaoHistoricoComponent, {
      width: '800px',
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  historicoItem(id: string): void {
    this.service.getSessaoById(id).subscribe(sessao => {
      if (sessao) {
        this.openHistoricoDialog(sessao);
      }
    });
  }

  // isScreenSmall(): boolean {
  //   return this.screenWidth <= 500;
  // }

  openSnackBar (msg: string = 'Removido com sucesso!'): void {
    this.snackBar.open(msg, 'X', {
      duration: TimeoutConfigEnum.SNACK_BAR_DURATION,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  spinnerOn(): void {
    this.spinner = false;
  }

  spinnerOff(): void {
    setTimeout(() => {
      this.spinner = true;
    }, TimeoutConfigEnum.SPINNER_DURATION);
  }

}
