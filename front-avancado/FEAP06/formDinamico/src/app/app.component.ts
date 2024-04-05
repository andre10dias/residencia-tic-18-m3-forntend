import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormService } from './service/form.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Campo } from './model/campo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [FormService]
})
export class AppComponent {
  formDinamico!: FormGroup;
  campos: Campo[] = [];

  title = 'Formulário dinâmico';

  applyClassToDiv: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: FormService
  ) {
    this.service.getFirst().subscribe(data => {
      this.campos = this.converter(data);

      this.formDinamico = this.formBuilder.group({});
      this.campos.forEach(campo => {
        this.formDinamico.addControl(campo.nome, this.formBuilder.control(''));

        if (campo.tipo === 'checkbox') {
          this.applyClassToDiv = true;
        }
      });
    });
  }

  converter(json: any): Campo[] {
    const campos: Campo[] = [];
    
    for (const chave in json) {
      if (json.hasOwnProperty(chave)) {
        let tipo: string;

        // Verificar o tipo do campo
        if (typeof json[chave] === 'string') {
          tipo = 'text';
        } 
        else if (typeof json[chave] === 'number') {
          tipo = 'number';
        } 
        else if (json[chave] instanceof Date) {
          tipo = 'date';
        } 
        else if (typeof json[chave] === 'boolean') {
          console.log('Entrou boolean');
          tipo = 'checkbox';
        } 
        else {
          console.log('Entrou boolean');
          tipo = 'unknown';
        }

        // Adicionar o campo ao array de campos
        campos.push({
          tipo: tipo,
          nome: chave,
          rotulo: this.transformar(chave)
        });
      }
    }

    return campos;
  }

  transformar(input: string): string {
    // Adiciona um espaço antes de cada letra maiúscula após uma letra minúscula
    const formattedString = input.replace(/([a-z])([A-Z])/g, '$1 $2');
    // Transforma a primeira letra em maiúscula e as demais em minúsculas
    return formattedString.charAt(0).toUpperCase() + formattedString.slice(1).toLowerCase();
  }

  onSubmit() {
    console.log(this.formDinamico.value);
  }

}