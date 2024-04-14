import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './service/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  hideNavbar: boolean = false;
  title = 'atendimentoPet';

  constructor(
    private router: Router, 
    private service: AuthService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideNavbar = (event.url === '/login') || (event.url === '/') || (event.url === '');
      }
    });
  }

  ngOnInit() {
    this.service.autoLogin();
  }

}
