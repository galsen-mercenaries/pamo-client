import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as SecureLS from 'secure-ls';
const ls = new SecureLS({ encodingType: 'aes' });

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

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
    return next.handle(request);
  }
}
