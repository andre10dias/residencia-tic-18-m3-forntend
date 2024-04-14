import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarConfigEnum } from '../../../enum/snackbar-config.enum';
import { PesoService } from '../../../service/peso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActionEnum } from '../../../enum/action-enum';
import { PesoFormDTO } from '../../../model/peso/peso-form.dto';
import { SuinoUtil } from '../../../util/suino.util';
import { SuinoFormComponent } from '../../suino/suino-form/suino-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-peso-form',
  templateUrl: './peso-form.component.html',
  styleUrl: './peso-form.component.css'
})
export class PesoFormComponent implements OnInit {
    @ViewChild('suinoFormRef') pesoFormRef: any;
    pesoForm: FormGroup;
  
    title = 'Cadastrar peso';
    btnText = 'Cadastrar';
    action = ActionEnum.CREATE;
    dadosItemSelecionado: PesoFormDTO = {} as PesoFormDTO;
  
    brincoAnimalList: number[] = [];
  
    constructor(
      private service: PesoService, 
      private util: SuinoUtil,
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
        'brincoAnimal': new FormControl(null, [
          Validators.required
        ]),
        'peso': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^\d{0,3}(.\d{0,2})?$/)
        ]),
        'dataPeso': new FormControl(null, [
          Validators.required
        ])
      });
    }
  
    ngOnInit(): void {
      if (this.dadosItemSelecionado) {
        this.pesoForm.patchValue(this.dadosItemSelecionado);
      }

      this.service.listaPesosAnimal.subscribe(listaPesos => {
        this.brincoAnimalList = listaPesos;
      });
    }
  
    onSubmit(): void {
      if (this.pesoForm.invalid) {
        this.openSnackBar('Por favor, preencha o formulário corretamente.');
        return;
      }
  
      if (this.action == ActionEnum.CREATE) {
        this.service.save(this.pesoForm.value);
        this.openSnackBar();
      } 
      else if (this.action == ActionEnum.EDIT) {
        this.service.edit(this.pesoForm.value);
        this.openSnackBar('Atualizado com sucesso!');
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
        duration: SnackbarConfigEnum.DURATION,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }
}
