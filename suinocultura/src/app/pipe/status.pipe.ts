import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(status: string): unknown {
    return status == 'A' ? 'Ativo' : status == 'M' ? 'Morto' : 'Vendido';
  }

}
