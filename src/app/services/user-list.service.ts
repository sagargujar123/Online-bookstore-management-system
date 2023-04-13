import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
private baseUrl="https://bookstore-mnmt-system.osc-fr1.scalingo.io";
  constructor(private http:HttpClient) { }

  getAllUsers(){
    return this.http.get(`${this.baseUrl}/bookstore/user/get`);
  }

  getUserByUserId(id:any){
    return this.http.get(`${this.baseUrl}/bookstore/user/get/${id}`);
  }

  updateUserRole(id:any, data:any){
    return this.http.put(`${this.baseUrl}/bookstore/user/update/${id}`,data);
  }

  deleteUserByUserId(id:any){
    return this.http.delete(`${this.baseUrl}/bookstore/user/delete/${id}`);
  }
}
