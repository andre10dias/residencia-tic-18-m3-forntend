import { Peso } from "../peso/peso";
import { Sessao } from "../sessao/sessao";
import { Suino } from "../suino/suino";

export interface HistoricoAnimalDTO {
    suino: Suino | undefined
    pesos: Peso[]
    sessoes: Sessao[]
}
