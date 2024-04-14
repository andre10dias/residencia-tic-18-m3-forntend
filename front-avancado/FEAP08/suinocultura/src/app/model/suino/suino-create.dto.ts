export interface SuinoCreateDTO {
    id: string | null
    brincoAnimal: number
    brincoPai: number
    brincoMae: number
    dataNascimento: Date
    dataSaida: Date;
    status: string;
    sexo: string;
    createdAt: Date
}