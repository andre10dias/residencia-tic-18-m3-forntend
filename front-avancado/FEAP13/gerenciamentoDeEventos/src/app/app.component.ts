import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { eventosStore } from './component/store/evento.store';
import { EventoService } from './service/evento.service';
import { AuthService } from './service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    ToolbarComponent,
    FooterComponent,
    DashboardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'gerenciamentoDeEventos';
  hideToolbar: boolean = false;
  
  readonly storeEvento = inject(eventosStore);
  readonly eventoService = inject(EventoService);
  readonly router = inject(Router);
  readonly authService = inject(AuthService);
  
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideToolbar = (event.url === '/login') || (event.url === '/') || (event.url === '');
      }
    });

    this.authService.autoLogin();
    this.carregarEventos();
  }

  carregarEventos() {
    this.eventoService.getAll().subscribe({
      next: listaEventos => {
        listaEventos.forEach(evento => {
          this.storeEvento.adicionarEvento(evento);
        });
      },
      error: error => {
        console.error('Erro ao carregar a lista:', error);
      }
    });
  }
}
