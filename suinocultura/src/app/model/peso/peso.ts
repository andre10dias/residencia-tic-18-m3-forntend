export class Peso {
    private _id: string;
    private _brincoAnimal: number;
    private _peso: number;
    private _dataPeso: Date;
    private _createdAt: Date;
    private _updatedAt: Date | null;

    constructor(
        id: string,
        brincoAnimal: number,
        peso: number,
        dataPeso: Date,
        createdAt: Date,
        updatedAt: Date | null
    ) {
        this._id = id;
        this._brincoAnimal = brincoAnimal;
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

    get brincoAnimal(): number {
        return this._brincoAnimal;
    }

    set brincoAnimal(value: number) {
        this._brincoAnimal = value;
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
