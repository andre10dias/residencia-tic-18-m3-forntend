import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexo'
})
export class SexoPipe implements PipeTransform {

  transform(sexo: string): unknown {
    return sexo == 'M' ? 'Macho' : 'Fêmea';
  }

}
