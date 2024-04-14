import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { SessaoService } from '../../../service/sessao.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SessaoFormDTO } from '../../../model/sessao/sessao-form.dto';
import { AtividadeChartDTO } from '../../../model/sessao/atividade-chart.dto';

declare const google: any;

@Component({
  selector: 'app-sessao-historico-grafico',
  templateUrl: './sessao-historico-grafico.component.html',
  styleUrl: './sessao-historico-grafico.component.css'
})
export class SessaoHistoricoGraficoComponent {
  @ViewChild('ComboChart') ComboChart: ElementRef = {} as ElementRef;

  dadosItemSelecionado: SessaoFormDTO = {} as SessaoFormDTO;
  dadosTabela: (string | number)[][] = [];
  listaAtividades: AtividadeChartDTO[] = [];
  brincoAnimal: number;

  constructor(
    private service: SessaoService,
    public dialogRef: MatDialogRef<SessaoHistoricoGraficoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.listaAtividades = data;
    this.brincoAnimal = data[0].brincoAnimal;
  }
    
  ngAfterViewInit() {
    this.drawChart();
  }

  getDataTable(): (string | number)[][] {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Data pesagem');
    data.addColumn('number', 'Peso');
  
    this.listaAtividades.forEach(atividade => {
      data.addRow([atividade.nomeAtividade, +atividade.qtdRepeticoes]);
    });
  
    return data;
  }

  drawChart = () => {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      const options = {
        legend: 'none',
        title: 'Número de repetições por atividade',
        vAxis: { title: 'Número de repetições' },
        hAxis: { title: 'Atividade' },
        seriesType: 'bars',
        series: { 5: { type: 'line' } }
      };
  
      const chart = new google.visualization.ComboChart(this.ComboChart.nativeElement);
      chart.draw(this.getDataTable(), options);
    });
  }

}
