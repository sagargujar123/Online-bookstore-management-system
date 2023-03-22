import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Books } from '../shared/models/books';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl="http://localhost:3000";
  constructor(private http:HttpClient) { }

  addBookToCart(book:any){
    return this.http.post(`${this.baseUrl}/cart`,book);
  }

  getAllBooksFromCart(){
    return this.http.get(`${this.baseUrl}/cart`);
  }

  deleteBookById(id:any){
    return this.http.delete(`${this.baseUrl}/cart/${id}`);
  }
}
