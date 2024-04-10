import { Suino } from "../suino/suino";

export interface PesoEditDTO {
    id: string;
    suino: Suino;
    peso: number;
    dataPeso: Date;
    createdAt: Date;
    updatedAt: Date;
}