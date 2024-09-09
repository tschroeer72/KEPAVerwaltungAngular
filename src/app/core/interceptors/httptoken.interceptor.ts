import { HttpInterceptorFn } from '@angular/common/http';
import { BackendService } from '../../services/backend.service';
import { inject } from '@angular/core';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const backendService = inject(BackendService);
  const token = backendService.getToken();
  
  req = req.clone({setHeaders: {'Content-type': 'application/json'}});

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  //console.log('interceptor ', req);
  return next(req);  
};
