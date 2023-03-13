import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private baseUrl="http://localhost:3000/logindetails";
  private Url="http://localhost:3000/signupdetails";

  constructor(private http:HttpClient) { }

  sendLoginData(data:any){
    return this.http.post(`${this.baseUrl}`,data);
  }

  sendSignUpData(data:any){
    return this.http.post(`${this.Url}`,data);
  }
}
