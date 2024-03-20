import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuinoService } from '../../../service/suino.service';
import { SuinoFormDTO } from '../../../model/suino/suino-form.dto';
import { ActionEnum } from '../../../enum/action-enum';
import { SnackbarConfigEnum } from '../../../enum/snackbar-config.enum';

@Component({
  selector: 'app-suino-form',
  templateUrl: './suino-form.component.html',
  styleUrl: './suino-form.component.css'
})
export class SuinoFormComponent implements OnInit {
  @ViewChild('suinoFormRef') suinoFormRef: any;
  suinoForm: FormGroup;

  title = 'Cadastrar suino';
  btnText = 'Cadastrar';
  action = ActionEnum.CREATE;
  dadosItemSelecionado: SuinoFormDTO = {} as SuinoFormDTO;

  constructor(
    private snackBar: MatSnackBar,
    private service: SuinoService,
    public dialogRef: MatDialogRef<SuinoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.title = data.title;
    this.btnText = data.txtButton;
    this.action = data.action;
    this.dadosItemSelecionado = data.element;

    this.suinoForm = new FormGroup({
      'id': new FormControl(null),
      'brincoAnimal': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d+$/),
        this.brincoRequired,
        this.brincoNumeric, 
      ]),
      'brincoPai': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d+$/),
        this.brincoRequired,
        this.brincoNumeric,  
      ]),
      'brincoMae': new FormControl(null, [
        Validators.required, 
        Validators.pattern(/^\d+$/),
        this.brincoRequired,
        this.brincoNumeric, 
      ]),
      'dataNascimento': new FormControl(null, [
        Validators.required
      ]),
      'dataSaida': new FormControl(null, [
        Validators.required
      ]),
      'status': new FormControl(null, [
        Validators.required
      ]),
      'sexo': new FormControl(null, [
        Validators.required
      ])
    });
  }

  ngOnInit(): void {
    if (this.dadosItemSelecionado) {
      this.suinoForm.patchValue(this.dadosItemSelecionado);
    }
  }

  brincoRequired(control: FormControl): { [key: string]: boolean } | null {
    const valor = control.value;

    if (!valor) {
      return { 'required': true };
    }

    return null;
  }
  
  brincoNumeric(control: FormControl): { [key: string]: boolean } | null {
    const valor = control.value;

    if (isNaN(valor)) {
      return { 'numeric': true };
    }

    return null;
  }
  

  get statusList(): any[] {
    return this.service.status;
  }

  get sexoList(): any[] {
    return this.service.sexo;
  }

  onSubmit(): void {
    if (this.suinoForm.invalid) {
      this.openSnackBar('Por favor, preencha o formulário corretamente.');
      return;
    }

    if (this.action == ActionEnum.CREATE) {
      this.service.save(this.suinoForm.value);
      this.openSnackBar();
    } 
    else if (this.action == ActionEnum.EDIT) {
      this.service.edit(this.suinoForm.value);
      this.openSnackBar('Atualizado com sucesso!');
    }

  }

  openSnackBar (msg: string = 'Cadastrado com sucesso!'): void {
    this.snackBar.open(msg, 'X', {
      duration: SnackbarConfigEnum.DURATION,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

}
