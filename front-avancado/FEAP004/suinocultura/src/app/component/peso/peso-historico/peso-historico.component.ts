import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { PesoService } from '../../../service/peso.service';
import { PesoChartDTO } from '../../../model/peso/peso-chart.dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PesoFormDTO } from '../../../model/peso/peso-form.dto';

declare const google: any;

@Component({
  selector: 'app-peso-historico',
  templateUrl: './peso-historico.component.html',
  styleUrls: ['./peso-historico.component.css']
})
export class PesoHistoricoComponent implements AfterViewInit {
  @ViewChild('ComboChart') ComboChart: ElementRef = {} as ElementRef;

  dadosItemSelecionado: PesoFormDTO = {} as PesoFormDTO;
  dadosTabela: (string | number)[][] = [];
  listaPesos: PesoChartDTO[] = [];
  brincoAnimal: number;

  constructor(
    private service: PesoService,
    public dialogRef: MatDialogRef<PesoHistoricoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.listaPesos = data;
    this.brincoAnimal = data[0].brincoAnimal;
  }
    
  ngAfterViewInit() {
    this.drawChart();
  }

  getDataTable(): (string | number)[][] {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Data pesagem');
    data.addColumn('number', 'Peso');
  
    this.listaPesos.forEach(peso => {
      data.addRow([`${peso.dataPeso}`, +peso.peso]);
    });
  
    return data;
  }

  drawChart = () => {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      const options = {
        legend: 'none',
        title: 'Peso por data',
        vAxis: { title: 'peso (Kg)' },
        hAxis: { title: 'Mês' },
        seriesType: 'bars',
        series: { 2: { type: 'line' } }
      };
  
      const chart = new google.visualization.ComboChart(this.ComboChart.nativeElement);
      chart.draw(this.getDataTable(), options);
    });
  }

}
