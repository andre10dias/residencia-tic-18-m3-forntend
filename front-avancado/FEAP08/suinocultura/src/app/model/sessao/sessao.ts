import { Suino } from "../suino/suino";
import { Atividade } from "./atividade";

export class Sessao {

    constructor(
        public _id: string,
        public _dataSessao: Date,
        public _descricao: string,
        public _suinos: Suino[],
        public _atividades: Atividade[],
        public _createdAt: Date,
        public _updatedAt: Date | null
    ) { }

    set updatedAt(value: Date | null) {
        this._updatedAt = value;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }

    set descricao(value: string) {
        this._descricao = value;
    }

    set id(value: string) {
        this._id = value;
    }

    set suinos(value: Suino[]) {
        this._suinos = value;
    }

    set atividades(value: Atividade[]) {
        this._atividades = value;
    }

    set dataSessao(value: Date) {
        this.dataSessao = value;
    }

    get descricao(): string {
        return this._descricao;
    }

    get dataSessao(): Date {
        return this._dataSessao;
    }

    get id(): string {
        return this._id;
    }

    get suinos(): Suino[] {
        return this._suinos;
    }

    get atividades(): Atividade[] {
        return this._atividades;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date | null {
        return this._updatedAt;
    }

}
