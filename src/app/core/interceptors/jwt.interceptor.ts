import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // ✅ Lista de rutas que deben llevar token
  const secureRoutes = [
    '/api/admin',
    '/api/user',
    '/api/orders',
    '/api/orders/',
    '/api/soporte'
  ];

  // ✅ Solo agregar token si la ruta es privada
  const shouldAttachToken = secureRoutes.some(route => req.url.includes(route));

  if (token && shouldAttachToken) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
