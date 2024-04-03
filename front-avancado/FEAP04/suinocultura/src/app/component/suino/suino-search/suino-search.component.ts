import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SuinoService } from '../../../service/suino.service';
import { MatAccordion } from '@angular/material/expansion';
import { SuinoListDTO } from '../../../model/suino/suino-list.dto';

@Component({
  selector: 'app-suino-search',
  templateUrl: './suino-search.component.html',
  styleUrl: './suino-search.component.css'
})
export class SuinoSearchComponent {
  @ViewChild(MatAccordion) accordion: any;
  suinoSearch: FormGroup;

  listaSuinosFiltrados: SuinoListDTO[] = [];

  constructor(private service: SuinoService) {
    this.suinoSearch = new FormGroup({
      'brincoPai': new FormControl(null),
      'brincoMae': new FormControl(null),
      'dataNascimento': new FormControl(null),
      'dataSaida': new FormControl(null),
      'status': new FormControl(null),
      'sexo': new FormControl(null)
    });
  }

  get statusList(): any[] {
    return this.service.status;
  }

  get sexoList(): any[] {
    return this.service.sexo;
  }

  onSubmit(): void {
    this.service.filtrar(this.suinoSearch.value);
    this.service.suinosFiltrados$.subscribe((suinos: SuinoListDTO[]) => {
      this.listaSuinosFiltrados = suinos;
    });
  }

  reset(): void {
    this.suinoSearch.reset();
    this.service.resetarFiltro();
    this.service.suinosFiltrados$.subscribe((suinos: SuinoListDTO[]) => {
      this.listaSuinosFiltrados = suinos;
    })
  }

}
