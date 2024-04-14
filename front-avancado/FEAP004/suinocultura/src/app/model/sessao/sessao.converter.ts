import { Injectable } from "@angular/core";

import { SuinoUtil } from "../../util/suino.util";
import { Sessao } from "./sessao";
import { SessaoFormDTO } from "./sessao-form.dto";
import { SessaoListDTO } from "./sessao-list.dto";

@Injectable({
    providedIn: 'root'
})
export class SessaoConverter {

    constructor(private util: SuinoUtil) {}
    
    toListSessaoListDTOs(listaSessao: Sessao[]): SessaoListDTO[] {
        let sessaoListDTO: SessaoListDTO[] = [];
        let sessao: SessaoListDTO;
        
        listaSessao.forEach(data => {
            // console.log('[sessaoConverter] toListSessaoListDTOs: ', data);
            sessao = {
                id: data.id,
                descricao: data.descricao,
                dataSessao: this.util.formatarData(data.dataSessao, 'dd/MM/yyyy'),
                suinos: data.suinos,
                atividades: data.atividades,
                createdAt: this.util.formatarData(data.createdAt, 'dd/MM/yyyy')
            }

            sessaoListDTO.push(sessao);
        })

        return sessaoListDTO;
    }

    toSessaoFormDTO(sessao: Sessao): SessaoFormDTO {
        let suinosId = sessao.suinos.map(suino => suino.id);
        let atividadesId = sessao.atividades.map(atividade => atividade.id);

        let sessaoFormDTO: SessaoFormDTO = {
            id: sessao.id,
            dataSessao: this.util.formatarData(sessao.dataSessao),
            descricao: sessao.descricao,
            suinosId: suinosId,
            atividadesId: atividadesId
        };

        return sessaoFormDTO;
    }
}
