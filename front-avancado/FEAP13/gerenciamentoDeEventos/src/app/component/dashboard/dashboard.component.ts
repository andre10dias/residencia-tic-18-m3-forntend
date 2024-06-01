import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { eventosStore } from '../store/evento.store';
import { EventoService } from '../../service/evento.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  readonly storeEvento = inject(eventosStore);
  readonly service = inject(EventoService);
  
  ngOnInit(): void {
    this.storeEvento.eventos();
  }

}
