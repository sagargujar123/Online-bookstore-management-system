import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Books } from '../shared/models/books';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
private baseUrl='https://bookstore-mnmt-system.osc-fr1.scalingo.io';

  constructor(private http:HttpClient) { }
  
  getAllBooks():Observable<Books[]>{
    return this.http.get<Books[]>(`${this.baseUrl}/book/all`);
  }

  getBookById(id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/book/${id}`);
  }
}
