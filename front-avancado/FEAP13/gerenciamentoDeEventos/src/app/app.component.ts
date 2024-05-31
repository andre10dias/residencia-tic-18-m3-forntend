import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { FooterComponent } from './component/footer/footer.component';

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
export class AppComponent {
  title = 'gerenciamentoDeEventos';
}
