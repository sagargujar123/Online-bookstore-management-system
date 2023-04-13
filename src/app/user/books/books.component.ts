import { Component, OnInit } from '@angular/core';
import { BookServiceService } from 'src/app/services/book-service.service';
import { Books } from 'src/app/shared/models/books';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{
  books:Books[]=[];

  constructor(private bookService:BookServiceService){}
  ngOnInit(): void {
    this.getBooks();
  }
  
  getBooks(){
    this.bookService.getAllBooks().subscribe((response)=>{
      this.books=response;
      console.log(this.books);
    });
  }
}
