import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peso'
})
export class PesoPipe implements PipeTransform {

  transform(peso: string): unknown {
    return peso + ' kg';
  }

}
