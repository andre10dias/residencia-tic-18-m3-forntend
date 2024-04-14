import { Injectable } from "@angular/core";

import { SuinoUtil } from "../../util/suino.util";
import { PesoListDTO } from "./peso-list.dto";
import { Peso } from "./peso";
import { PesoFormDTO } from "./peso-form.dto";
import { PesoChartDTO } from "./peso-chart.dto";

@Injectable({
    providedIn: 'root'
})
export class PesoConverter {

    constructor(private util: SuinoUtil) {}
    
    // toPesoListDTO(atendimento: Atendimento): PesoListDTO {
    //     return {
    //         id: atendimento.id,
    //         nomeTutor: atendimento.nomeTutor,
    //         nomePet: atendimento.nomePet,
    //         dataAtendimento: this.util.formatarData(atendimento.dataAtendimento, 'dd/MM/yyyy'),
    //         raca: atendimento.raca
    //     };
    // }

    toListPesoListDTOs(listasPesos: Peso[]): PesoListDTO[] {
        let pesosListDTO: PesoListDTO[] = [];
        let peso: PesoListDTO;
        
        listasPesos.forEach(data => {
            // console.log('[pesoConverter] toListPesoListDTOs: ', data);
            peso = {
                id: data.id,
                brincoAnimal: data.brincoAnimal,
                dataPeso: this.util.formatarData(data.dataPeso, 'dd/MM/yyyy'),
                peso: data.peso,
                createdAt: this.util.formatarData(data.createdAt, 'dd/MM/yyyy')
            }

            pesosListDTO.push(peso);
        })

        return pesosListDTO;
    }

    toPesoFormDTO(peso: Peso): PesoFormDTO {
        let pesoFormDTO: PesoFormDTO = {
            id: peso.id,
            brincoAnimal: peso.brincoAnimal,
            dataPeso: this.util.formatarData(peso.dataPeso),
            peso: peso.peso
        };

        return pesoFormDTO;
    }

    toListPesoChartDTOs(listaPesos: Peso[]): PesoChartDTO[] {
        let pesosChartDTO: PesoChartDTO[] = [];
        let peso: PesoChartDTO;
        
        listaPesos.forEach(data => {
            peso = {
                id: data.id,
                brincoAnimal: data.brincoAnimal,
                dataPeso: this.util.formatarData(data.dataPeso, 'dd/MM/yyyy'),
                peso: data.peso
            }

            pesosChartDTO.push(peso);
        });

        return pesosChartDTO;
    }
    
    // toAtendimentoEditDTO(atendimento: Atendimento): AtendimentoEditDTO {
    //     let atendimentoEditDTO: AtendimentoEditDTO = {
    //         id: atendimento.id,
    //         nomeTutor: atendimento.nomeTutor,
    //         nomePet: atendimento.nomePet,
    //         dataAtendimento: atendimento.dataAtendimento,
    //         tipo: atendimento.tipo,
    //         observacao: atendimento.observacao,
    //         raca: atendimento.raca,
    //         updateAt: atendimento.updateAt
    //     };

    //     return atendimentoEditDTO;
    // }

}