import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
private baseUrl='http://localhost:3000/books';

  constructor(private http:HttpClient) { }
  
  getBookList(){
    return this.http.get(`${this.baseUrl}`);
  }
}
