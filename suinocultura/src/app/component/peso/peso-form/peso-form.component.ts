import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { lastValueFrom } from 'rxjs';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PesoService } from '../../../service/peso.service';

import { TimeoutConfigEnum } from '../../../enum/timeout.config.enum';
import { ActionEnum } from '../../../enum/action.enum';

import { PesoFormDTO } from '../../../model/peso/peso-form.dto';
import { Suino } from '../../../model/suino/suino';
import { SuinoService } from '../../../service/suino.service';

@Component({
  selector: 'app-peso-form',
  templateUrl: './peso-form.component.html',
  styleUrl: './peso-form.component.css'
})
export class PesoFormComponent implements OnInit {
    @ViewChild('pesoFormRef') pesoFormRef: any;
    pesoForm: FormGroup;

    spinner: boolean = false;
  
    title = 'Cadastrar peso';
    btnText = 'Cadastrar';
    action = ActionEnum.CREATE;
    dadosItemSelecionado: PesoFormDTO = {} as PesoFormDTO;
  
    suinosList: Suino[] = [];
  
    constructor(
      private service: PesoService, 
      private suinoService: SuinoService,
      private snackBar: MatSnackBar,
      public dialogRef: MatDialogRef<PesoFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) 
    {
      this.title = data.title;
      this.btnText = data.txtButton;
      this.action = data.action;
      this.dadosItemSelecionado = data.element;

      this.pesoForm = new FormGroup({
        'id': new FormControl(null),
        'suino': new FormControl(null, [
          Validators.required
        ]),
        'peso': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^\d{0,3}(.\d{0,2})?$/)
        ]),
        'dataPeso': new FormControl(null, [
          Validators.required
        ]),
        'createdAt': new FormControl(null)
      });
    }
  
    ngOnInit(): void {
      if (this.dadosItemSelecionado) {
        this.pesoForm.patchValue(this.dadosItemSelecionado);
        this.pesoForm.get('suino')?.setValue(this.dadosItemSelecionado.suino.id);
      }

      this.listarSuinos();
    }

    listarSuinos() {
      this.suinoService.getAll().subscribe((listaSuinos: Suino[]) => {
        this.suinosList = listaSuinos.sort((a, b) => a.brincoAnimal - b.brincoAnimal);
      });
    }
    
  
    async onSubmit(): Promise<void> {
      this.spinnerOn();
      if (this.pesoForm.invalid) {
        this.openSnackBar('Por favor, preencha o formulário corretamente.');
        this.spinnerOff();
        return;
      }

      const peso = this.pesoForm.get('peso')?.value.replace(',', '.');
      const suino = await this.getSuinoById(this.pesoForm.get('suino')?.value);
    
      if (suino === undefined) {
        this.openSnackBar('Suíno não encontrado.');
        this.spinnerOff();
        return;
      }
      
      this.pesoForm.get('peso')?.setValue(peso);
      this.pesoForm.get('suino')?.setValue(suino);
  
      if (this.action == ActionEnum.CREATE) {
        this.service.save(this.pesoForm.value);
        this.openSnackBar();
      } 
      else if (this.action == ActionEnum.EDIT) {
        this.service.edit(this.pesoForm.value);
        this.openSnackBar('Atualizado com sucesso!');
      }

      this.spinnerOff();
    }

    async getSuinoById(id: string): Promise<Suino | undefined> {
      try {
        return await lastValueFrom(this.suinoService.getSuinoById(id));
      } catch (error) {
        console.error('Erro ao obter suíno por ID:', error);
        return undefined;
      }
    }


    // formataPeso(): void {
    //   this.pesoForm.get('peso')?.valueChanges.subscribe((valor: string) => {
    //     const valorFormatado = this.util.formatarPeso(valor);
    //     this.pesoForm.get('peso')?.setValue(valorFormatado, { emitEvent: false });
    //   });
    // }
  
    openSnackBar (msg: string = 'Cadastrado com sucesso!'): void {
      this.snackBar.open(msg, 'X', {
        duration: TimeoutConfigEnum.SNACK_BAR_DURATION,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }

    spinnerOn(): void {
      this.spinner = true;
    }
  
    spinnerOff(): void {
      setTimeout(() => {
        this.spinner = false;
      }, 1000);
    }

}
