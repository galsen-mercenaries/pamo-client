import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as SecureLS from 'secure-ls';
import { tap } from 'rxjs/operators';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

const ls = new SecureLS({ encodingType: 'aes' });

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = ls.get('access-token');
    let headers = request.headers;
    if (token) {
      headers = request.headers;
      headers = headers.set('Authorization', `Bearer ${token}`);
      request = request.clone({
          headers
      });
  }
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              // check if token is expired, if yes go to login page
              const currentTime = new Date().getTime() / 1000;
              const jwt: any = jwt_decode(token);
              if (token && currentTime > jwt.exp) {
                ls.removeAll();
                ls.clear();
                this.router.navigate(['/']);
              }
            }
          }
        }
      )
    );
  }
}
