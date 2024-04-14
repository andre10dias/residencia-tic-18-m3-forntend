import { AtividadeHistoricoDTO } from "./atividade-historico.dto";

export interface SessaoSuinoHistoricoDTO {
    suinoId: string;
    brincoAnimalSuino: number;
    atividadesHistorico: AtividadeHistoricoDTO[];
}
