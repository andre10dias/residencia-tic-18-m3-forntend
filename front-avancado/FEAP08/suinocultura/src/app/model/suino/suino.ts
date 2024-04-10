export class Suino {
    private _id: string;
    private _brincoAnimal: number;
    private _brincoPai: number;
    private _brincoMae: number;
    private _dataNascimento: Date;
    private _dataSaida: Date;
    private _status: string;
    private _sexo: string;
    private _createdAt: Date;
    private _updatedAt: Date | null;

    constructor(
        id: string,
        brincoAnimal: number,
        brincoPai: number,
        brincoMae: number,
        dataNascimento: Date,
        dataSaida: Date,
        status: string,
        sexo: string,
        createdAt: Date,
        updatedAt: Date | null
    ) {
        this._id = id;
        this._brincoAnimal = brincoAnimal;
        this._brincoPai = brincoPai;
        this._brincoMae = brincoMae;
        this._dataNascimento = dataNascimento;
        this._dataSaida = dataSaida;
        this._status = status;
        this._sexo = sexo;
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

    get brincoPai(): number {
        return this._brincoPai;
    }

    set brincoPai(value: number) {
        this._brincoPai = value;
    }

    get brincoMae(): number {
        return this._brincoMae;
    }

    set brincoMae(value: number) {
        this._brincoMae = value;
    }

    get dataNascimento(): Date {
        return this._dataNascimento;
    }

    set dataNascimento(value: Date) {
        this._dataNascimento = value;
    }

    get dataSaida(): Date {
        return this._dataSaida;
    }

    set dataSaida(value: Date) {
        this._dataSaida = value;
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    get sexo(): string {
        return this._sexo;
    }

    set sexo(value: string) {
        this._sexo = value;
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
