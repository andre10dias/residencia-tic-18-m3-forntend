import { SessaoSuinoHistoricoDTO } from "./sessao-suino-historico.dto";

export interface SessaoHistoricoDTO {
    descricaoSessao: string;
    dataSessao: String;
    suinosHistorico: SessaoSuinoHistoricoDTO[];
}