import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { eventosStore } from '../store/evento.store';

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
  
  ngOnInit(): void {
    this.storeEvento.eventos();
  }

}
