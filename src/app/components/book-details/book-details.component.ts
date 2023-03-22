import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';
import { CartService } from 'src/app/services/cart.service';
import { Books } from 'src/app/shared/models/books';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book!: Books;
  cartId:any;
  bookId:any;
  userId:any;
  quantity:any;

  ngOnInit(): void {
    this.getBook();
  }
  constructor(private bookService: BookServiceService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router) { }

  getBook() {
    this.bookService.getBookById(this.route.snapshot.params['id']).subscribe((response) => {
      this.book = response;
      console.log(response);
    })
  }

  addToCart(book: any) {
    this.cartService.addBookToCart(book).subscribe((response) => {
      console.log(response);
    })
  }
}
