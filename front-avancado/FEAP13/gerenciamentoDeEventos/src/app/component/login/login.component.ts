import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  snackBarDuration = 3000;
  erro: string = '';

  loginForm: FormGroup;
  mensagem: string = '';

  modoLogin = true;
  estaCarregando = false;
  temErro:boolean = false;

  constructor(
    private service: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = new FormGroup({
      'senha': new FormControl(null, [
        Validators.required,
        Validators.minLength(4)
      ]),
      'email': new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
    });
  }

  onTrocarModo() {
    this.modoLogin = !this.modoLogin;
  }

  onSubmit(){
    if(!this.loginForm.valid){
      return;
    }

    const {email, senha} = this.loginForm.value;

    this.estaCarregando = true;

    // console.log(email, senha);
    if(this.modoLogin) {
      this.service.loginUser(email, senha).subscribe({
        next: (data) => {
          this.estaCarregando = false;
          this.temErro = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          switch(error.error.error.message){
            case 'INVALID_LOGIN_CREDENTIALS':
              this.erro = 'E-mail ou senha inválidos.';
              break;
            default:
              this.erro = 'Ocorreu um erro ao cadastrar o usuário.'
              break;
          }

          if (this.erro) {
            this.openSnackBar();
          }
        }
      });
    } 
    else {
      this.service.signupUser(email, senha).subscribe({
        next: (data) => {
          this.estaCarregando = false;
          this.temErro = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          switch(error.error.error.message){
            case 'EMAIL_EXISTS':
              this.erro = 'O e-mail já está em uso.';
              break;
            default:
              this.erro = 'Ocorreu um erro ao cadastrar o usuário.'
              break;
          
          }

          this.temErro = true;
          this.estaCarregando = false;
          if (this.erro) {
            this.openSnackBar();
          }
        }
      });
    }

    this.loginForm.reset();
  }

  openSnackBar () {
    this.snackBar.open(this.erro, 'X', {
      duration: this.snackBarDuration,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
