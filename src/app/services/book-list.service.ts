import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookListService {
  private baseUrl="https://bookstore-mnmt-system.osc-fr1.scalingo.io";

  constructor(private http:HttpClient) { }

  addBook(data:any){
    return this.http.post(`${this.baseUrl}/book/add`,data);
  }

  getAllBooks(){
    return this.http.get(`${this.baseUrl}/book/all`);
  }

  getBookById(id:any){
    return this.http.get(`${this.baseUrl}/book/${id}`);
  }

  updateBookById(bookId:any, data:any){
    return this.http.put(`${this.baseUrl}/book/update/${bookId}`,data);
  }

  deleteBookById(id:any){
    return this.http.delete(`${this.baseUrl}/book/delete/${id}`);
  }
}
