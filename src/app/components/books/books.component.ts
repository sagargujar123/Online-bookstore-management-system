import { Component, OnInit } from '@angular/core';
import { BookServiceService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{
  books:any;

  constructor(private bookService:BookServiceService){}
  ngOnInit(): void {
    this.getBooks();
  }
  
  getBooks(){
    this.bookService.getBookList().subscribe((result)=>{
      this.books=result;
      console.log(this.books);
    });
  }
}
