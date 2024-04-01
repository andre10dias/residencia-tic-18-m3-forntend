import { Suino } from "../suino/suino";

export interface PesoCreateDTO {
    id: string | null;
    suino: Suino;
    peso: number;
    dataPeso: Date;
    createdAt: Date;
}