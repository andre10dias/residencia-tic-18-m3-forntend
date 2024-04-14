import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { HistoricoAnimalListDTO } from '../../../model/historico-animal/historico-animal-list.dto';
import { SuinoUtil } from '../../../util/suino.util';
import { TimeoutConfigEnum } from '../../../enum/timeout.config.enum';

@Component({
  selector: 'app-historico-animal-list',
  templateUrl: './historico-animal-list.component.html',
  styleUrl: './historico-animal-list.component.css'
})
export class HistoricoAnimalListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  @Input() historicoAnimalList: HistoricoAnimalListDTO[] = [];

  spinner: boolean = false;

  displayedColumns: string[] = ['data', 'atividade', 'resultado'];
  dataSource = new MatTableDataSource<HistoricoAnimalListDTO>();
  sortedData: HistoricoAnimalListDTO[] = [];

  constructor(
    private util: SuinoUtil
  ){
  }
  
  ngOnInit(): void {
    this.atualizarDadosLista(this.historicoAnimalList);
  }

  atualizarDadosLista(lista: HistoricoAnimalListDTO[]): void {
    this.spinnerOn();
    this.historicoAnimalList = lista;
    this.dataSource = new MatTableDataSource<HistoricoAnimalListDTO>(this.historicoAnimalList);
    this.sortedData = this.historicoAnimalList.slice();

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
    // const data = this.historicoAnimalList.slice();
    const data = this.dataSource.data.slice();

    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'data':
          return this.util.compareDates(a.data, b.data, isAsc);
        case 'atividade':
          return this.util.compare(a.atividade, b.atividade, isAsc);
        default:
          return this.util.compareDates(a.data, b.data, isAsc);
      }
    });
  }

  spinnerOn(): void {
    this.spinner = true;
  }

  spinnerOff(): void {
    setTimeout(() => {
      this.spinner = false;
    }, TimeoutConfigEnum.SPINNER_DURATION);
  }

}
