import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl="http://localhost:3000";

  constructor(private http:HttpClient) { }

  addBooksToOrder(books:any){
    return this.http.post(`${this.baseUrl}/order`,books)
  }

  getOrderdBooks(){
    return this.http.get(`${this.baseUrl}/order`);
  }
}
