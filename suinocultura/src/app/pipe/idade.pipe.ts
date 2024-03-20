import { Pipe, PipeTransform } from '@angular/core';
import { SuinoService } from '../service/suino.service';
import { SuinoUtil } from '../util/suino.util';

@Pipe({
  name: 'idade'
})
export class IdadePipe implements PipeTransform {

  constructor(
    private service: SuinoService,
    private util: SuinoUtil
  ) { }

  transform(dataNascimento: string): string {
    if (!dataNascimento) return '';

    let data = this.util.stringToDate(dataNascimento);

    if (!data) return '';

    const hoje = new Date();
    const nascimento = new Date(data);

    let idadeEmMeses = (hoje.getFullYear() - nascimento.getFullYear()) * 12;
    idadeEmMeses -= nascimento.getMonth();
    idadeEmMeses += hoje.getMonth();

    if (hoje.getDate() < nascimento.getDate()) {
      idadeEmMeses--;
    }

    return idadeEmMeses.toString() + ' meses';
  }

}
