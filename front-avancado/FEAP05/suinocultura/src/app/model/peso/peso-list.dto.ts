import { Suino } from "../suino/suino";

export interface PesoListDTO {
    id: string;
    suino: Suino;
    peso: number;
    dataPeso: string;
    createdAt: string;
}