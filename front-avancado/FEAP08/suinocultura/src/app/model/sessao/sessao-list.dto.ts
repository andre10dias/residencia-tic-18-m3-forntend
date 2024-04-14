import { Suino } from "../suino/suino"
import { Atividade } from "./atividade"

export interface SessaoListDTO {
    id: string
    dataSessao: string,
    descricao: string,
    suinos: Suino[],
    atividades: Atividade[],
    createdAt: string
}
