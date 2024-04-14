import { Injectable } from "@angular/core";

import { SuinoUtil } from "../../util/suino.util";
import { SuinoListDTO } from "./suino-list.dto";
import { Suino } from "./suino";
import { SuinoFormDTO } from "./suino-form.dto";

@Injectable({
    providedIn: 'root'
})
export class SuinoConverter {

    constructor(private util: SuinoUtil) {}
    
    // toSuinoListDTO(atendimento: Atendimento): SuinoListDTO {
    //     return {
    //         id: atendimento.id,
    //         nomeTutor: atendimento.nomeTutor,
    //         nomePet: atendimento.nomePet,
    //         dataAtendimento: this.util.formatarData(atendimento.dataAtendimento, 'dd/MM/yyyy'),
    //         raca: atendimento.raca
    //     };
    // }

    toListSuinoListDTOs(listasSuinos: Suino[]): SuinoListDTO[] {
        let suinosListDTO: SuinoListDTO[] = [];
        let suino: SuinoListDTO;
        
        listasSuinos.forEach(data => {
            // console.log('[suinoConverter] toListSuinoListDTOs: ', data);
            suino = {
                id: data.id,
                brincoAnimal: data.brincoAnimal,
                brincoPai: data.brincoPai,
                brincoMae: data.brincoMae,
                dataNascimento: this.util.formatarData(data.dataNascimento, 'dd/MM/yyyy'),
                dataSaida: this.util.formatarData(data.dataSaida, 'dd/MM/yyyy'),
                status: data.status,
                sexo: data.sexo,
                createdAt: this.util.formatarData(data.createdAt, 'dd/MM/yyyy')
            }

            suinosListDTO.push(suino);
        })

        return suinosListDTO;
    }

    toSuinoFormDTO(suino: Suino): SuinoFormDTO {
        let suinoFormDTO: SuinoFormDTO = {
            id: suino.id,
            brincoAnimal: suino.brincoAnimal,
            brincoPai: suino.brincoPai,
            brincoMae: suino.brincoMae,
            dataNascimento: this.util.formatarData(suino.dataNascimento),
            dataSaida: this.util.formatarData(suino.dataSaida),
            status: suino.status,
            sexo: suino.sexo
        };

        return suinoFormDTO;
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