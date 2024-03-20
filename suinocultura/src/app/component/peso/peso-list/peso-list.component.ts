import { Component, ViewChild } from '@angular/core';
import { SnackbarConfigEnum } from '../../../enum/snackbar-config.enum';
import { PesoFormDTO } from '../../../model/peso/peso-form.dto';
import { ActionEnum } from '../../../enum/action-enum';
import { PesoFormComponent } from '../peso-form/peso-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { PesoListDTO } from '../../../model/peso/peso-list.dto';
import { PesoService } from '../../../service/peso.service';
import { SuinoUtil } from '../../../util/suino.util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { DialogComponent } from '../../dialog/dialog.component';
import { PesoConverter } from '../../../model/peso/peso.converter';
import { PesoHistoricoComponent } from '../peso-historico/peso-historico.component';
import { PesoChartDTO } from '../../../model/peso/peso-chart.dto';

@Component({
  selector: 'app-peso-list',
  templateUrl: './peso-list.component.html',
  styleUrl: './peso-list.component.css'
})
export class PesoListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  listaPesos: PesoListDTO[] = [];
  dadosCarregados: boolean = false;
  spinner: boolean = false;
  screenWidth: number = window.innerWidth;
  
  displayedColumns: string[] = ['brincoAnimal', 'dataPeso', 'peso', 'action'];

  dataSource = new MatTableDataSource<PesoListDTO>();
  sortedData: PesoListDTO[] = [];

  constructor(
    private service: PesoService,
    private util: SuinoUtil,
    private converter: PesoConverter,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    this.carregardadosList();
  }

  ngOnInit(): void {
    this.service.novoPesoObservable.subscribe({
      next: (peso: PesoListDTO) => {
        this.dataSource.data.push(peso);
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

  carregardadosList(): void {
    this.service.getAll().subscribe({
      next: pesos => {
        this.listaPesos = this.converter.toListPesoListDTOs(pesos);
        this.atualizarDadosLista(this.listaPesos);
      },
      error: error => {
        console.error('Erro ao carregar a lista:', error);
      }
    });
  }

  atualizarDadosLista(lista: PesoListDTO[]): void {
    this.spinnerOn();
    this.listaPesos = lista;
    this.dataSource = new MatTableDataSource<PesoListDTO>(this.listaPesos);
    this.sortedData = this.listaPesos.slice();

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

  openDialog(element?: PesoFormDTO): void {
    const dialogRef = this.dialog.open(PesoFormComponent, {
      width: '600px',
      disableClose: true,
      data: { 
        element: element, 
        action: ActionEnum.EDIT, 
        title: 'Editar Peso', 
        txtButton: 'Editar' 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinnerOn();
        const index = this.dataSource.data.findIndex(item => item.id === element?.id);

        if (index !== -1) {
          setTimeout(() => {
            let peso = this.service.pesoAtualizado;
            this.dataSource.data[index] = peso;
            this.dataSource._updateChangeSubscription();
            this.dadosCarregados = true;
          }, 1000);
        }

        this.spinnerOff();
      }
    });
  }

  editItem(id: string): void {
    this.service.getPesoById(id).subscribe(peso => {
      if (peso) {
        peso.id = id;
        let pesoFormDTO: PesoFormDTO = this.converter.toPesoFormDTO(peso);
        this.openDialog(pesoFormDTO);
      }
    });
  }

  openHistoricoDialog(element?: PesoChartDTO[]): void {
    const dialogRef = this.dialog.open(PesoHistoricoComponent, {
      width: '800px',
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.spinnerOn();
        // this.spinnerOff();
      }
    });
  }

  historicoItem(id: string): void {
    this.service.getPesoById(id).subscribe(peso => {
      if (peso) {
        peso.id = id;
        this.service.getPesoByBrincoAnimal(peso.brincoAnimal).subscribe(pesos => {
          const pesoChart: PesoChartDTO[] = this.converter.toListPesoChartDTOs(pesos);
          this.openHistoricoDialog(pesoChart);
        });
      }
    });
  }

  sortData(sort: Sort) {
    // const data = this.listaPesos.slice();
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
        case 'dataPeso':
          return this.util.compareDates(a.dataPeso, b.dataPeso, isAsc);
        case 'peso':
          return this.util.compare(a.peso, b.peso, isAsc);
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
