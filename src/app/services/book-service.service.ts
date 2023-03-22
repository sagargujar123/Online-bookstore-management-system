import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Books } from '../shared/models/books';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
private baseUrl='http://localhost:3000/books';

  constructor(private http:HttpClient) { }
  
  getAllBooks():Observable<Books[]>{
    return this.http.get<Books[]>(`${this.baseUrl}`);
  }

  getBookById(id:any):Observable<any>{
    return this.http.get<Books>(`${this.baseUrl}/${id}`);
  }
}
