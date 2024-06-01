import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { eventosStore } from './component/store/evento.store';
import { EventoService } from './service/evento.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
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
  
  readonly storeEvento = inject(eventosStore);
  readonly service = inject(EventoService);
  
  ngOnInit(): void {
    this.carregarEventos();
  }

  carregarEventos() {
    this.service.getAll().subscribe({
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
