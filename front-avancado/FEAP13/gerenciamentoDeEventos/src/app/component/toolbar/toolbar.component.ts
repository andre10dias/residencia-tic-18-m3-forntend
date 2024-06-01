import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule, 
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  title = 'Gerenciamento de Eventos';

  constructor(
    private route: Router,
    private service: AuthService
  ) { }

  rotaEventos() {
    this.route.navigate(['/eventos']);
  }

  rotaDashboard() {
    this.route.navigate(['/dashboard']);
  }

  sair() {
    localStorage.clear();
    this.service.logout();
    this.route.navigate(['/login']);
  }

}
