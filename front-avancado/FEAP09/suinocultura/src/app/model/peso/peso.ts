import { Suino } from "../suino/suino";

export class Peso {
    private _id: string;
    private _suino: Suino;
    private _peso: number;
    private _dataPeso: Date;
    private _createdAt: Date;
    private _updatedAt: Date | null;

    constructor(
        id: string,
        suino: Suino,
        peso: number,
        dataPeso: Date,
        createdAt: Date,
        updatedAt: Date | null
    ) {
        this._id = id;
        this._suino = suino;
        this._peso = peso;
        this._dataPeso = dataPeso;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get suino(): Suino {
        return this._suino;
    }

    set suino(value: Suino) {
        this._suino = value;
    }

    get peso(): number {
        return this._peso;
    }

    set peso(value: number) {
        this._peso = value;
    }

    get dataPeso(): Date {
        return this._dataPeso;
    }

    set dataPeso(value: Date) {
        this._dataPeso = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }

    get updatedAt(): Date | null {
        return this._updatedAt;
    }

    set updatedAt(value: Date | null) {
        this._updatedAt = value;
    }

}
