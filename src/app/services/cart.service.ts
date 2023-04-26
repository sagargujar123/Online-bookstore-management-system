import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = "https://bookstore-mnmt-system.osc-fr1.scalingo.io";
  
  constructor(private http: HttpClient) { }

  private dataSubject = new BehaviorSubject<any>(0);
  data$ = this.dataSubject.asObservable();

  updateData(newValue: any) {
    this.dataSubject.next(newValue);
  }

  addBookToCart(book: any) {
    return this.http.post(`${this.baseUrl}/cart/add`, book);
  }

  getAllBooksFromCart(userId: any) {
    return this.http.get(`${this.baseUrl}/cart/${userId}`);
  }

  deleteBookById(id: any) {
    return this.http.delete(`${this.baseUrl}/cart/delete/${id}`);
  }

  updateCart(data: any) {
    return this.http.put(`${this.baseUrl}/cart/update`, data);
  }
}
