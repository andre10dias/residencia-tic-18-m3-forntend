export class Atividade {

    constructor(
        public _id: string,
        public _nome: string,
        public _createdAt: Date,
        public _updatedAt: Date | null
    ) { }

    get id(): string {
        return this._id;
    }

    get nome(): string {
        return this._nome;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }

    set nome(value: string) {
        this._nome = value;
    }

    set id(value: string) {
        this._id = value;
    }

    get updatedAt(): Date | null {
        return this._updatedAt;
    }

    set updatedAt(value: Date | null) {
        this._updatedAt = value;
    }

}
