import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { exhaustMap, take } from 'rxjs';
import { AuthService } from '../service/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return authService.usuario.pipe(
    take(1),
    exhaustMap(usuario => {
      if (!usuario) {
        return next(req);
      }
      const requestModificado = req.clone({
        params: new HttpParams().set('auth', usuario.token!)
      });
      return next(requestModificado);
    })
  );
};
