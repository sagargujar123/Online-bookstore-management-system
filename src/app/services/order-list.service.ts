import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class OrderListService {
private baseUrl="https://bookstore-mnmt-system.osc-fr1.scalingo.io";

  constructor(private http:HttpClient) { }

  getOrderListByUserId(id:any){
    return this.http.get(`${this.baseUrl}/order/user_order/${id}`);
  }

  deleteOrderByOrderId(id:any){
    return this.http.delete(`${this.baseUrl}/order/delete/${id}`);
  }
}
