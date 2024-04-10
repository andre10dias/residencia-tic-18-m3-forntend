import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SuinoUtil {

    formatarData(dataParam: Date, formato: string = 'yyyy-MM-dd'): string {
        // const data = new Date(dataParam);
        let data: Date;

        // Verificar se dataParam é uma string e, em seguida, converter para uma instância de Date
        if (typeof dataParam === 'string') {
            data = new Date(dataParam);
        } else {
            data = dataParam;
        }

        // Verificar se data é uma instância de Date
        if (!(data instanceof Date)) {
            return 'Data inválida';
        }

        // Criar uma nova data considerando o fuso horário local
        data = new Date(data.getTime() + data.getTimezoneOffset() * 60000);

        // Adiciona um zero à esquerda se o dia/mês for menor que 10
        const dia = data.getDate().toString().padStart(2, '0'); 
        const mes = (data.getMonth() + 1).toString().padStart(2, '0'); 
        const ano = data.getFullYear();

        if (formato === 'dd/MM/yyyy') {
            return `${dia}/${mes}/${ano}`;
        }

        return `${ano}-${mes}-${dia}`;
    }

    stringToDate(dataString: string): Date | null {
        const partes = dataString.split('/');

        if (partes.length === 3) {
            const dia = parseInt(partes[0], 10);
            const mes = parseInt(partes[1], 10) - 1; // Mês começa do zero no objeto Date
            const ano = parseInt(partes[2], 10);
            
            // Verifica se os valores são válidos
            if (!isNaN(dia) && !isNaN(mes) && !isNaN(ano)) {
                return new Date(ano, mes, dia);
            }
        }
        
        // Retorna null se a string estiver em um formato inválido
        console.log('Invalid date.');
        return null;
    }

    compare(a: number | string, b: number | string, isAsc: boolean) {
        if (a === b) {
            return 0;
        }
        
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    compareDates(a: string, b: string, isAsc: boolean): number {
        let parte1A = a.split('/');
        let parte1B = b.split('/');

        let parte2A = a.split('-');
        let parte2B = b.split('-');

        if (parte1A.length === 3 && parte1B.length === 3) {
            return this.compare(parte1A[2] + parte1A[1] + parte1A[0], parte1B[2] + parte1B[1] + parte1B[0], isAsc);
        } 
        else if (parte2A.length === 3 && parte2B.length === 3) {
            return this.compare(parte2A[2] + parte2A[1] + parte2A[0], parte2B[2] + parte2B[1] + parte2B[0], isAsc);
        }

        return 0;

        // const dateA = new Date(a);
        // const dateB = new Date(b);

        // if (dateA === dateB) {
        //     return 0;
        // }

        // return (dateA < dateB ? -1 : 1) * (isAsc ? 1 : -1);
    }

}   