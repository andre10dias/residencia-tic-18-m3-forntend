import { Suino } from "../suino/suino"
import { Atividade } from "./atividade"

export interface SessaoEditDTO {
    id: string,
    dataSessao: Date,
    descricao: string,
    suinos: Suino[],
    atividades: Atividade[],
    createdAt: Date,
    updatedAt: Date
}
