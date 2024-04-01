import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

import { lastValueFrom } from 'rxjs';

import { SuinoService } from '../../../service/suino.service';
import { SuinoUtil } from '../../../util/suino.util';
import { SuinoConverter } from '../../../model/suino/suino.converter';

import { ActionEnum } from '../../../enum/action.enum';
import { TimeoutConfigEnum } from '../../../enum/timeout.config.enum';

import { SuinoListDTO } from '../../../model/suino/suino-list.dto';
import { DialogComponent } from '../../dialog/dialog.component';
import { SuinoFormDTO } from '../../../model/suino/suino-form.dto';
import { SuinoFormComponent } from '../suino-form/suino-form.component';
import { PesoService } from '../../../service/peso.service';
import { SessaoService } from '../../../service/sessao.service';
import { Peso } from '../../../model/peso/peso';
import { Sessao } from '../../../model/sessao/sessao';

@Component({
  selector: 'app-suino-list',
  templateUrl: './suino-list.component.html',
  styleUrl: './suino-list.component.css'
})
export class SuinoListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  listaSuinos: SuinoListDTO[] = [];
  listaPesosSuino: Peso[] = [];
  listaSessoesSuino: Sessao[] = [];

  dadosCarregados: boolean = false;
  spinner: boolean = false;
  screenWidth: number = window.innerWidth;
  
  displayedColumns: string[] = ['brincoAnimal', 'brincoPai', 'brincoMae', 
    'dataNascimento', 'dataSaida', 'status', 'sexo', 'idade', 'action'];

  dataSource = new MatTableDataSource<SuinoListDTO>();
  sortedData: SuinoListDTO[] = [];

  title: string = 'Excluir atendimento';
  removeTemplate: string = '<div>Tem certeza que deseja remover?</div>';

  constructor(
    private service: SuinoService,
    private pesoService: PesoService,
    private sessaoService: SessaoService,
    private util: SuinoUtil,
    private converter: SuinoConverter,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    this.resultadoBusca();
    this.carregardadosList();
  }

  ngOnInit(): void {
    this.service.novoSuinoObservable$.subscribe({
      next: (suino: SuinoListDTO) => {
        this.dataSource.data.push(suino);
        this.dataSource._updateChangeSubscription();
      }
    });

    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };

    // if (this.isScreenSmall()) {
    //   this.displayedColumns = ['brincoAnimal', 'brincoPai', 'brincoMae', 
    //   'dataNascimento', 'dataSaida', 'status', 'sexo', 'idade', 'action'];
    // }
  }

  // carregardadosList(): void {
  //   this.spinnerOn();

  //   this.service.getAll().subscribe({
  //     next: suinos => {
  //       this.listaSuinos = this.converter.toListSuinoListDTOs(suinos);
  //       this.dataSource = new MatTableDataSource<SuinoListDTO>(this.listaSuinos);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       this.spinnerOff();
  //     },
  //     error: error => {
  //       console.error('Erro ao carregar suínos:', error);
  //       this.spinnerOff();
  //     }
  //   });
  // }

  carregardadosList(): void {
    this.service.getAll().subscribe({
      next: suinos => {
        this.listaSuinos = this.converter.toListSuinoListDTOs(suinos);
        console.log('[SuinoListComponent - carregardadosList] listaSuinos: ', this.listaSuinos);
        this.atualizarDadosLista(this.listaSuinos);
      },
      error: error => {
        console.error('Erro ao carregar a lista:', error);
      }
    });
  }

  resultadoBusca(): void {
    this.service.suinosFiltrados$.subscribe({
      next: (suinos: SuinoListDTO[]) => {
        this.atualizarDadosLista(suinos);
      },
      error: error => {
        console.error('Erro ao carregar a lista:', error);
      }
    })
  }
  
  resetarBusca(): void {
    this.service.resetFiltros$.subscribe({
      next: (suinos: SuinoListDTO[]) => {
        this.atualizarDadosLista(suinos);
      },
      error: error => {
        console.error('Erro ao carregar a lista:', error);
      }
    })
  }

  atualizarDadosLista(lista: SuinoListDTO[]): void {
    this.spinnerOn();
    this.listaSuinos = lista;

    // this.listaSuinos.sort((a: any, b: any) => {
    //   const dateA = new Date(a.createdAt);
    //   const dateB = new Date(b.createdAt);
    //   return dateB.getTime() - dateA.getTime();
    // });

    console.log('[SuinoListComponent - atualizarDadosLista] listaSuinos: ', this.listaSuinos);

    this.dataSource = new MatTableDataSource<SuinoListDTO>(this.listaSuinos);
    this.sortedData = this.listaSuinos.slice();

    this.dataSource._updateChangeSubscription();
    
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      let label = document.querySelector('#mat-paginator-page-size-label-0') as HTMLElement;
      // let label2 = document.querySelector('.mat-mdc-paginator-range-label') as HTMLElement;
      
      if (label) {
        label.innerHTML = 'Itens por página:';
      }
    }, TimeoutConfigEnum.UPDATE_LIST_DURATION);

    this.spinnerOff();
  }

  openDialog(element?: SuinoFormDTO): void {
    const dialogRef = this.dialog.open(SuinoFormComponent, {
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
        this.spinnerOn();
        const index = this.dataSource.data.findIndex(item => item.id === element?.id);

        console.log('Close dialog');

        if (index !== -1) {
          setTimeout(() => {
            let suino = this.service.suinoAtualizado;
            this.dataSource.data[index] = suino;
            this.dataSource._updateChangeSubscription();
            this.dadosCarregados = true;
          }, TimeoutConfigEnum.CLOSE_DIALOG_DURATION);
        }

        this.spinnerOff();
      }
    });
  }

  editItem(id: string): void {
    console.log('[SuinoListComponent - editItem]  Chamando getSuinoById: ', id);
    this.service.getSuinoById(id).subscribe(suino => {
      if (suino) {
        suino.id = id;
        let suinoFormDTO: SuinoFormDTO = this.converter.toSuinoFormDTO(suino);
        this.openDialog(suinoFormDTO);
      }
    });
  }

  async removeItem(id: string): Promise<void> {
    const index = this.dataSource.data.findIndex(item => item.id === id);

    if (index !== -1) {
      const listaPesosAssociados = await this.buscarPesosAssociados(id);
      const listaSessoesAssociadas = await this.buscarSessoesAssociadas(id);

      this.service.delete(id, listaPesosAssociados, listaSessoesAssociadas);
      this.openSnackBar();

      this.dataSource.data.splice(index, 1);
      console.log('[SuinoListComponent - removeItem] dataSource: ', this.dataSource);
      this.dataSource._updateChangeSubscription();
    }
  }

  async buscarPesosAssociados(suinoId: string): Promise<Peso[]> {
    try {
      return await lastValueFrom(this.pesoService.getPesosBySuinoId(suinoId));
    } catch (error) {
      console.error('Erro ao buscar pesos associados ao suíno:', error);
      return [];
    }
  }

  async buscarSessoesAssociadas(suinoId: string): Promise<Sessao[]> {
    try {
      return await lastValueFrom(this.sessaoService.getSessoesBySuinoId(suinoId));
    } catch (error) {
      console.error('Erro ao buscar pesos associados ao suíno:', error);
      return [];
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
        case 'brincoAnimal':
          return this.util.compare(a.brincoAnimal, b.brincoAnimal, isAsc);
        case 'brincoPai':
          return this.util.compare(a.brincoPai, b.brincoPai, isAsc);
        case 'brincoMae':
          return this.util.compare(a.brincoMae, b.brincoMae, isAsc);
        case 'dataNascimento':
          return this.util.compareDates(a.dataNascimento, b.dataNascimento, isAsc);
        case 'dataSaida':
          return this.util.compareDates(a.dataSaida, b.dataSaida, isAsc);
        case 'status':
          return this.util.compare(a.status, b.status, isAsc);
        case 'sexo':
          return this.util.compare(a.sexo, b.sexo, isAsc);
        case 'idade':
          return this.util.compareDates(a.dataNascimento, b.dataNascimento, isAsc);
        default:
          return this.util.compareDates(a.createdAt, b.createdAt, isAsc);
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
    this.spinner = true;
  }

  spinnerOff(): void {
    setTimeout(() => {
      this.spinner = false;
    }, 1000);
  }

}
