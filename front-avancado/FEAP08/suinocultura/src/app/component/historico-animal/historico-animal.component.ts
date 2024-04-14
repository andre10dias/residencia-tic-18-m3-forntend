import { Component } from '@angular/core';

import { forkJoin } from 'rxjs';

import { SuinoUtil } from '../../util/suino.util';
import { SuinoService } from '../../service/suino.service';
import { PesoService } from '../../service/peso.service';
import { SessaoService } from '../../service/sessao.service';

import { Suino } from '../../model/suino/suino';
import { Peso } from '../../model/peso/peso';
import { Sessao } from '../../model/sessao/sessao';

import { HistoricoAnimalDTO } from '../../model/historico-animal/historico-animal.dto';
import { HistoricoAnimalListDTO } from '../../model/historico-animal/historico-animal-list.dto';
import { TimeoutConfigEnum } from '../../enum/timeout.config.enum';
import { PesoChartDTO } from '../../model/peso/peso-chart.dto';
import { PesoHistoricoComponent } from '../peso/peso-historico/peso-historico.component';
import { MatDialog } from '@angular/material/dialog';
import { PesoConverter } from '../../model/peso/peso.converter';
import { AtividadeConverter } from '../../model/sessao/atividade-converter';
import { SessaoHistoricoGraficoComponent } from '../sessao/sessao-historico-grafico/sessao-historico-grafico.component';

@Component({
  selector: 'app-historico-animal',
  templateUrl: './historico-animal.component.html',
  styleUrl: './historico-animal.component.css'
})
export class HistoricoAnimalComponent {
  suinosList: Suino[] = [];
  historicoAnimalList: HistoricoAnimalListDTO[] = [];
  historicoCarregado: boolean = false;

  suinoSelecionado: Suino | undefined;

  spinner: boolean = false;

  constructor(
    private suinoService: SuinoService,
    private pesoService: PesoService,
    private sessaoService: SessaoService,
    private pesoConverter: PesoConverter,
    private atividadeConverter: AtividadeConverter,
    private util: SuinoUtil,
    public dialog: MatDialog,
  ) {
    this.suinoService.getAll().subscribe({
      next: (suinos) => {
        this.suinosList = suinos;
      },
      error: (error) => {
        console.log('error: ', error);
      }
    });
  }
  
  carregarHistorico(suinoId: string): void {
    let pesosList: Peso[] = [];
    let sessoesList: Sessao[] = [];
    this.suinoSelecionado = this.suinosList.find(s => s.id === suinoId);

    forkJoin([
      this.pesoService.getListaPesosBySuinoId(suinoId),
      this.sessaoService.getSessoesBySuinoId(suinoId)
  ]).subscribe({
      next: ([pesos, sessoes]) => {
          pesosList = pesos;
          sessoesList = sessoes;

          let historicoAnimal: HistoricoAnimalDTO = {
              suino: this.suinoSelecionado,
              pesos: pesosList,
              sessoes: sessoesList
          };

          this.getHistorico(historicoAnimal);
      },
      error: (error) => {
          console.log('error: ', error);
      }
  });
  }

  getHistorico(historicoAnimal: HistoricoAnimalDTO): void {
    this.historicoAnimalList = [];
    
    historicoAnimal.pesos.forEach(peso => {
      let historico: HistoricoAnimalListDTO = {
        data: this.util.formatarData(peso.dataPeso, 'dd/MM/yyyy'),
        atividade: 'Pesagem',
        resultado: peso.peso.toString()
      }

      this.historicoAnimalList.push(historico);
    });

    historicoAnimal.sessoes.forEach(sessao => {
      let data: string = this.util.formatarData(sessao.dataSessao, 'dd/MM/yyyy');

      sessao.atividades.forEach(atividade => {
        let historico: HistoricoAnimalListDTO = {
          data: data,
          atividade: atividade.nome,
          resultado: 'Concoluído(a)'
        }

        this.historicoAnimalList.push(historico);
      });
    });

    this.historicoCarregado = this.historicoAnimalList.length > 0 ? true : false;
  }

  pesoHistorico(): void {
    if (this.suinoSelecionado) {
      this.pesoService.getPesosBySuinoId(this.suinoSelecionado.id).subscribe(pesos => {
        const pesoChart: PesoChartDTO[] = this.pesoConverter.toListPesoChartDTOs(pesos);
        this.openHistoricoDialog(pesoChart, PesoHistoricoComponent);
      });
    }
  }

  sessaoHistorico(): void {
    if (this.suinoSelecionado) {
      this.sessaoService.getSessoesBySuinoId(this.suinoSelecionado.id).subscribe(sessoes => {
        const sessaoChart: any[] = this.atividadeConverter.toListAtividadeChartDTOs(this.suinoSelecionado, sessoes);
        this.openHistoricoDialog(sessaoChart, SessaoHistoricoGraficoComponent);
      });
    }
  }

  openHistoricoDialog(element?: any[], component?: any): void {
    const dialogRef = this.dialog.open(component, {
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

  spinnerOn(): void {
    this.spinner = true;
  }

  spinnerOff(): void {
    setTimeout(() => {
      this.spinner = false;
    }, TimeoutConfigEnum.SPINNER_DURATION);
  }

}
