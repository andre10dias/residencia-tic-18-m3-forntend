import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const eventoGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const isAuthenticated = authService.isAuthenticated();
  const url = state.url;

  // Se o usuário estiver autenticado, permita o acesso à rota solicitada
  if (isAuthenticated) {
    return true;
  }

  // Se o usuário não estiver autenticado e tentar acessar a página de login, permita o acesso
  if (url === '/login') {
    return true;
  }

  // Se o usuário não estiver autenticado e tentar acessar qualquer outra página, redirecione-o para a página de login
  router.navigate(['/login']);
  return false;
};
