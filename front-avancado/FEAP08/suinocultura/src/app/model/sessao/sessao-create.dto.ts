import { Suino } from "../suino/suino"
import { Atividade } from "./atividade"

export interface SessaoCreateDTO {
    id: string | null
    dataSessao: Date,
    descricao: string,
    suinos: Suino[],
    atividades: Atividade[],
    createdAt: Date
}
