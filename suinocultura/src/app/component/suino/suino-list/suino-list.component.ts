import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SuinoService } from '../../../service/suino.service';
import { SuinoUtil } from '../../../util/suino.util';
import { SuinoConverter } from '../../../model/suino/suino.converter';

import { SuinoListDTO } from '../../../model/suino/suino-list.dto';
import { DialogComponent } from '../../dialog/dialog.component';
import { SuinoFormDTO } from '../../../model/suino/suino-form.dto';
import { SuinoFormComponent } from '../suino-form/suino-form.component';
import { ActionEnum } from '../../../enum/action-enum';
import { SnackbarConfigEnum } from '../../../enum/snackbar-config.enum';

@Component({
  selector: 'app-suino-list',
  templateUrl: './suino-list.component.html',
  styleUrl: './suino-list.component.css'
})
export class SuinoListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  listaSuinos: SuinoListDTO[] = [];
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
    private util: SuinoUtil,
    private converter: SuinoConverter,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    this.resultadoBusca();
    this.carregardadosList();
  }

  ngOnInit(): void {
    this.service.novoSuinoObservable.subscribe({
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
      next: suimos => {
        this.listaSuinos = this.converter.toListSuinoListDTOs(suimos);
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
    }, 500);

    this.spinnerOff();
  }

  openDialog(element?: SuinoFormDTO): void {
    const dialogRef = this.dialog.open(SuinoFormComponent, {
      width: '600px',
      disableClose: true,
      data: { 
        element: element, 
        action: ActionEnum.EDIT, 
        title: 'Editar Suíno', 
        txtButton: 'Editar' 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinnerOn();
        const index = this.dataSource.data.findIndex(item => item.id === element?.id);

        if (index !== -1) {
          setTimeout(() => {
            let suino = this.service.suinoAtualizado;
            this.dataSource.data[index] = suino;
            this.dataSource._updateChangeSubscription();
            this.dadosCarregados = true;
          }, 1000);
        }

        this.spinnerOff();
      }
    });
  }

  editItem(id: string): void {
    this.service.getSuinoById(id).subscribe(suino => {
      if (suino) {
        suino.id = id;
        let suinoFormDTO: SuinoFormDTO = this.converter.toSuinoFormDTO(suino);
        this.openDialog(suinoFormDTO);
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
      duration: SnackbarConfigEnum.DURATION,
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
    }, 1000);
  }

}
