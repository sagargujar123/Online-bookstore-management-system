import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import {MessageService} from 'primeng/api';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private messageService:MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token=localStorage.getItem('token');
    const tokenReq=request.clone({
      setHeaders:{
       Authorization:`Bearer ${token}`
      }
    })
    return next.handle(tokenReq).pipe(
      catchError((error:HttpErrorResponse)=>{
        let errorMsg='';
        if(error.error instanceof ErrorEvent){
          errorMsg=error.error.message;
          this.messageService.add({severity:'warn', summary: 'warn', detail: error.error.message});
        }
        else{
          // if(error.status===200){
          //   this.messageService.add({severity:'success', summary: 'Success', detail: error.error.message});
          //   // errorMsg=error.error.message;
          // }
          // else 
          if(error.status===400){
            this.messageService.add({severity:'error', summary: 'error', detail: error.error.message});
          }
          else if(error.status===401){
            this.messageService.add({severity:'error', summary: 'error', detail: error.error.message});
          }
          else {
            console.log("an error occured");
          }
        }
        console.log(errorMsg);
        return throwError(()=>errorMsg);
      })
    )
  }
}
