import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl="https://bookstore-mnmt-system.osc-fr1.scalingo.io";

  constructor(private http:HttpClient) { }

  getOrderdBooks(userId:any){
    return this.http.get(`${this.baseUrl}/cart/${userId}`);
  }

  getOrderByUserId(userId:any){
    return this.http.get(`${this.baseUrl}/order/orderitems/${userId}`);
  }

  addOrderByUserId(data:any){
    return this.http.post(`${this.baseUrl}/order/add`,data)
  }

  getOrderList(userId:any){
    return this.http.get(`${this.baseUrl}/order/user_order/${userId}`);
  }
}
