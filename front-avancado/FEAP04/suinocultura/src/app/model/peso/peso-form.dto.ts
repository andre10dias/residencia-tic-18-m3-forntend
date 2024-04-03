import { Suino } from "../suino/suino";

export interface PesoFormDTO {
    id: string;
    suino: Suino;
    peso: number;
    dataPeso: string;
    createdAt: Date;
}