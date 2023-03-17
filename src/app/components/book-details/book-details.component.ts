import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{
  book:any;

  ngOnInit(): void {
    this.getBook();
  }
  constructor(private bookService:BookServiceService, private route:ActivatedRoute){}

  getBook(){
    this.bookService.getBookById(this.route.snapshot.params['id']).subscribe((result)=>{
      this.book=result;
      console.log(result);
    })
  }
}
