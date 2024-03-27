import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SessaoService } from '../../../service/sessao.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sessao } from '../../../model/sessao/sessao';
import { MatTableDataSource } from '@angular/material/table';
import { Suino } from '../../../model/suino/suino';
import { SuinoService } from '../../../service/suino.service';
import { SessaoHistoricoDTO } from '../../../model/sessao/sessao-historico.dto';
import { AtividadeHistoricoDTO } from '../../../model/sessao/atividade-historico.dto';
import { SuinoUtil } from '../../../util/suino.util';
import { SessaoSuinoHistoricoDTO } from '../../../model/sessao/sessao-suino-historico.dto';

interface Dados {
  [key: string]: any; // Chaves dinâmicas correspondentes às colunas
}

@Component({
  selector: 'app-sessao-historico',
  templateUrl: './sessao-historico.component.html',
  styleUrl: './sessao-historico.component.css'
})
export class SessaoHistoricoComponent {
  spinner: boolean = false;
  title: string = 'Histórico da sessão';
  descricao: string = '';

  displayedColumns: string[] = ['Brinco do animal'];
  dataSource = new MatTableDataSource<any>();
  historico: SessaoHistoricoDTO = {} as SessaoHistoricoDTO;

  constructor(
    private snackBar: MatSnackBar,
    private util: SuinoUtil,
    private service: SessaoService,
    private suinoService: SuinoService,
    public dialogRef: MatDialogRef<SessaoHistoricoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.spinnerOn();
    suinoService.getAll().subscribe({
      next: (suinos) => {
        this.carregarHistorico(data, suinos);

        this.descricao = `${this.historico.descricaoSessao} - ${this.historico.dataSessao}`;

        const allAtividades = this.historico.suinosHistorico
            .flatMap(suino => suino.atividadesHistorico.map(atividade => atividade.nomeAtividade));
        this.displayedColumns.push(...new Set(allAtividades));

        this.dataSource = new MatTableDataSource<any>(this.carregarDataSource());

        this.spinnerOff();
      },
      error: (error) => {
        console.log('error: ', error);
        this.spinnerOff();
      }
    });
  }

  carregarHistorico(sessaoSelecionada: Sessao, listaSuinos: Suino[]): void {
    this.historico.descricaoSessao = sessaoSelecionada.descricao;
    this.historico.dataSessao = this.util.formatarData(sessaoSelecionada.dataSessao, 'dd/MM/yyyy');
  
    let listaSuinosHistorico: Set<SessaoSuinoHistoricoDTO> = new Set<SessaoSuinoHistoricoDTO>();
  
    listaSuinos.forEach((suino) => {
      let suinoHistorico: SessaoSuinoHistoricoDTO = {} as SessaoSuinoHistoricoDTO;
      suinoHistorico.suinoId = suino.id;
      suinoHistorico.brincoAnimalSuino = suino.brincoAnimal;
  
      suinoHistorico.atividadesHistorico = sessaoSelecionada.atividades.map(atividade => ({
        nomeAtividade: atividade.nome,
        atividadeConcluida: sessaoSelecionada.suinos.some(s => s.id === suino.id)
      }));
  
      listaSuinosHistorico.add(suinoHistorico);
    });
  
    this.historico.suinosHistorico = [...listaSuinosHistorico];
  }

  carregarDataSource(): any {
    let dados: Dados[] = [];

    this.historico.suinosHistorico.forEach((suino) => {
      let linha: any = {};
      linha['Brinco do animal'] = suino.brincoAnimalSuino;
  
      suino.atividadesHistorico.forEach((atividade) => {
          linha[atividade.nomeAtividade] = atividade.atividadeConcluida ? 'X' : 'Não aplicada';
      });
  
      dados.push(linha);
    });

    return dados;
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
