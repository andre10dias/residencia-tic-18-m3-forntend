import { Component, NgModule, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ActionEnum } from '../../../enum/action.enum';
import { eventosStore } from '../../store/evento.store';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatDialogModule, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Evento } from '../../../model/evento';

@Component({
  selector: 'app-evento-form',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
  ],
  templateUrl: './evento-form.component.html',
  styleUrl: './evento-form.component.css'
})
export class EventoFormComponent {
  @ViewChild('eventoFormRef') eventoFormRef: any;
  eventoForm: FormGroup;

  novoEvento: string = '';
  readonly storeEvento = inject(eventosStore);

  title = 'Cadastrar evento';
  btnText = 'Cadastrar';
  action = ActionEnum.CREATE;
  eventoSelecionado: Evento = {} as Evento;

  constructor(
    public dialogRef: MatDialogRef<EventoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.title = data.title;
    this.btnText = data.txtButton;
    this.action = data.action;
    this.eventoSelecionado = data.element;

    this.eventoForm = new FormGroup({
      'id': new FormControl(null),
      'codigo': new FormControl(null),
      'nome': new FormControl(null, [
        Validators.required
      ]),
      'data': new FormControl(null, [
        Validators.required,
        this.dataValidators
      ]),
      'horario': new FormControl(null, [
        Validators.required,
        this.horarioValidators
      ]),
      'local': new FormControl(null, [
        Validators.required
      ]),
    });
  }

  ngOnInit(): void {
    if (this.eventoSelecionado) {
      this.eventoForm.patchValue(this.eventoSelecionado);
    }
  }

  dataValidators(control: FormControl): { [key: string]: boolean } | null {
    const dataAtual = new Date();
    const inputDate = new Date(control.value);

    if (inputDate <= dataAtual) {
      return { 'dataInvalida': true };
    }

    return null;
  }

  //Função de fábrica que retorna uma função de validação, preservando o contexto this.
  horarioValidators() {
    return (control: FormControl): { [key: string]: boolean } | null => {
      const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

      if (control.value !== null) {
        control.setValue(this.retornarHorarioFormatado(control.value));

        if (control.value !== '' && !timePattern.test(control.value)) {
          return { 'horarioInvalido': true };
        }
      }

      return null;
    };
  }

  formatarHorario(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = this.retornarHorarioFormatado(input.value);
    // let valor = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    // if (valor.length === 4) {
    //   const horas = valor.substring(0, 2);
    //   const minutos = valor.substring(2, 4);
    //   input.value = `${horas}:${minutos}`;
    // } 
    // else if (valor.length === 3) {
    //   const horas = valor.charAt(0);
    //   const minutos = valor.substring(1, 3);
    //   input.value = `0${horas}:${minutos}`;
    // } 
    // else if (valor.length === 2) {
    //   input.value = `${valor}:00`;
    // } 
    // else if (valor.length === 1) {
    //   input.value = `0${valor}:00`;
    // } 
    // else {
    //   input.value = '';
    // }
  }

  retornarHorarioFormatado(horario: string = '00:00'): string {
    let valor = horario.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (valor.length === 4) {
      const horas = valor.substring(0, 2);
      const minutos = valor.substring(2, 4);
      horario = `${horas}:${minutos}`;
    } 
    else if (valor.length === 3) {
      const horas = valor.charAt(0);
      const minutos = valor.substring(1, 3);
      horario = `0${horas}:${minutos}`;
    } 
    else if (valor.length === 2) {
      horario = `${valor}:00`;
    } 
    else if (valor.length === 1) {
      horario = `0${valor}:00`;
    } 
    else {
      horario = '';
    }

    return horario;
  }

  onSubmit(): void {
    if (this.eventoForm.valid) {
      const form = this.eventoForm.value;

      const evento: Evento = {
        id: form.id,
        codigo: form.codigo,
        nome: form.nome,
        data: form.data,
        horario: form.horario,
        local: form.local
      }

      if (ActionEnum.CREATE === this.action) {
        evento.codigo = this.gerarCodigo();
        this.storeEvento.adicionarEvento(evento);
      }
      else {
        this.storeEvento.atualizarEvento(evento);
      }
    }

  }

  gerarCodigo() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

}
