import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Books } from '../shared/models/books';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl="https://bookstore-mnmt-system.osc-fr1.scalingo.io";
  constructor(private http:HttpClient) { }

  addBookToCart(book:any){
    return this.http.post(`${this.baseUrl}/cart/add`,book);
  }

  getAllBooksFromCart(userId:any){
    return this.http.get(`${this.baseUrl}/cart/${userId}`);
  }

  deleteBookById(id:any){
    return this.http.delete(`${this.baseUrl}/cart/delete/${id}`);
  }

  updateCart(data:any){
    return this.http.put(`${this.baseUrl}/cart/update`,data);
  }
}
