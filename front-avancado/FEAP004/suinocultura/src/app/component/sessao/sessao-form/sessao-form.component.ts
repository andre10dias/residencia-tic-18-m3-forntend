import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { forkJoin } from 'rxjs';

import { ActionEnum } from '../../../enum/action-enum';
import { SessaoFormDTO } from '../../../model/sessao/sessao-form.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SessaoService } from '../../../service/sessao.service';
import { SnackbarConfigEnum } from '../../../enum/snackbar-config.enum';
import { Suino } from '../../../model/suino/suino';
import { Atividade } from '../../../model/sessao/atividade';

@Component({
  selector: 'app-sessao-form',
  templateUrl: './sessao-form.component.html',
  styleUrl: './sessao-form.component.css'
})
export class SessaoFormComponent {
  @ViewChild('sessaoFormRef') sessaoFormRef: any;
  sessaoForm: FormGroup;

  title = 'Cadastrar sessão';
  btnText = 'Cadastrar';
  action = ActionEnum.CREATE;
  dadosItemSelecionado: SessaoFormDTO = {} as SessaoFormDTO;

  suinosList: Suino[] = [];
  atividadesList: Atividade[] = [];
  numeroBrincoExistente = false;

  constructor(
    private snackBar: MatSnackBar,
    private service: SessaoService,
    public dialogRef: MatDialogRef<SessaoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.title = data.title;
    this.btnText = data.txtButton;
    this.action = data.action;
    this.dadosItemSelecionado = data.element;

    this.sessaoForm = new FormGroup({
      'id': new FormControl(null),
      'suinosId': new FormControl(null, [
        Validators.required
      ]),
      'dataSessao': new FormControl(null, [
        Validators.required
      ]),
      'descricao': new FormControl(null, [
        Validators.required
      ]),
      'atividadesId': new FormControl(null, [
        Validators.required
      ])
    });
  }

  ngOnInit(): void {
    if (this.dadosItemSelecionado) {
      forkJoin([
        this.service.getListaSuinos(this.dadosItemSelecionado.suinosId),
        this.service.getListaAtividades(this.dadosItemSelecionado.atividadesId)
      ]).subscribe(([suinosData, atividadesData]) => {
        console.log('[SessaoFormComponent]  ngOnInit suinos:', suinosData);
        console.log('[SessaoFormComponent]  ngOnInit atividades:', atividadesData);
        console.log('[SessaoFormComponent]  ngOnInit dadosItemSelecionado:', this.dadosItemSelecionado);
  
        this.suinosList = suinosData;
        this.atividadesList = atividadesData;
  
        this.sessaoForm.patchValue({
          id: this.dadosItemSelecionado.id,
          descricao: this.dadosItemSelecionado.descricao,
          dataSessao: this.dadosItemSelecionado.dataSessao,
        });
  
        this.sessaoForm.get('suinosId')?.setValue(this.dadosItemSelecionado.suinosId);
        this.sessaoForm.get('atividadesId')?.setValue(this.dadosItemSelecionado.atividadesId);
  
        console.log('[SessaoFormComponent]  ngOnInit sessaoForm:', this.sessaoForm.value);
      });
    }

    this.service.listaSuinos.subscribe(listaSuinos => {
      console.log('[SessaoFormComponent]  ngOnInit listaSuinos:', listaSuinos);
      this.suinosList = listaSuinos;
    });

    this.service.listaAtividades.subscribe(listaAtividades => {
      console.log('[SessaoFormComponent]  ngOnInit listaAtividades:', listaAtividades);
      this.atividadesList = listaAtividades;
    });
  }

  onSubmit(): void {
    console.log('[SessaoFormComponent] OnSubmit: ', this.sessaoForm.value);
    if (this.sessaoForm.invalid) {
      this.openSnackBar('Por favor, preencha o formulário corretamente.');
      return;
    }

    if (this.action == ActionEnum.CREATE) {
      this.service.save(this.sessaoForm.value);
      this.openSnackBar();
    } 
    else if (this.action == ActionEnum.EDIT) {
      this.service.edit(this.sessaoForm.value);
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
