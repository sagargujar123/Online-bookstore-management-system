import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private baseUrl="https://bookstore-mnmt-system.osc-fr1.scalingo.io";

  constructor(private http:HttpClient) { }

  sendLoginData(data:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/user/login`,data);
  }

  sendSignUpData(data:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/user/signup`,data);
  }
}
