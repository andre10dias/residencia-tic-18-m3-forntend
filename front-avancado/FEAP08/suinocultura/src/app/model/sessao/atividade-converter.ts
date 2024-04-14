import { Injectable } from "@angular/core";
import { Atividade } from "./atividade";
import { AtividadeChartDTO } from "./atividade-chart.dto";
import { Sessao } from "./sessao";
import { Suino } from "../suino/suino";

@Injectable({
    providedIn: 'root'
})
export class AtividadeConverter {
    toListAtividadeChartDTOs(suino: Suino | undefined, listaSessoesDoSuino: Sessao[]): AtividadeChartDTO[] {

        let atividadesChartDTO: AtividadeChartDTO[] = [];
        let atividade: AtividadeChartDTO;

        if (suino) {
            listaSessoesDoSuino.forEach(sessao => {
                sessao.atividades.forEach(data => {
                    atividade = {
                        id: data.id,
                        brincoAnimal: suino.brincoAnimal,
                        nomeAtividade: data.nome,
                        qtdRepeticoes: this.getRepeticoesAtividadeBySuino(data, listaSessoesDoSuino)
                    }
        
                    atividadesChartDTO.push(atividade);
                });
            });
        }

        return atividadesChartDTO;
    }

    private getRepeticoesAtividadeBySuino(atividade: Atividade, listaSessoesDoSuino: Sessao[]): number {
        let qtdRepeticoes = 0;

        listaSessoesDoSuino.forEach(sessao => {
            sessao.atividades.forEach(data => {
                if (data.id == atividade.id) {
                    qtdRepeticoes++;
                }
            });
        });

        return qtdRepeticoes;
    }

}
