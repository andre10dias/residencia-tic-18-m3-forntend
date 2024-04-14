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
        let atividadesMap: Map<string, Atividade> = new Map<string, Atividade>(); // Usando um Map para evitar elementos repetidos
    
        if (suino) {
            listaSessoesDoSuino.forEach(sessao => {
                sessao.atividades.forEach(atividade => {
                    const atividadeId = atividade.id;
    
                    if (!atividadesMap.has(atividadeId)) {
                        atividadesMap.set(atividadeId, atividade);
                    }
                });
            });
    
            // Convertendo o Map para um array de AtividadeChartDTO
            atividadesMap.forEach(atividade => {
                const atividadeChartDTO: AtividadeChartDTO = {
                    id: atividade.id,
                    brincoAnimal: suino.brincoAnimal,
                    nomeAtividade: atividade.nome,
                    qtdRepeticoes: this.getRepeticoesAtividadeBySuino(atividade, listaSessoesDoSuino)
                };

                atividadesChartDTO.push(atividadeChartDTO);
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
