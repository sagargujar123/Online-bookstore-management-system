import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const sessionToken = localStorage.getItem('token');
    if (sessionToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionToken}`
        }
      });
    } else {
      request = request.clone();
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = error.message;
        }
        else {
          switch (error.status) {
            case 400:
              this.messageService.add({ severity: 'error', summary: 'error', detail: error.error.errorMessage });
              break;

            case 401:
              this.messageService.add({ severity: 'error', summary: 'error', detail: error.error.errorMessage });
              break;

            case 403:
              this.messageService.add({ severity: 'error', summary: 'error', detail: error.error.errorMessage });
              break;

            case 404:
              this.messageService.add({ severity: 'error', summary: 'error', detail:'Page '+ error.error.error });
              break;

            case 500:
              this.messageService.add({ severity: 'error', summary: 'error', detail: error.error.errorMessage });
              break;
          }
        }
        return throwError(() => errorMsg);
      })
    );
  }
}
