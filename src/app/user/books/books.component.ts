import { Component, OnInit } from '@angular/core';
import { BookServiceService } from 'src/app/services/book-service.service';
import { CartService } from 'src/app/services/cart.service';
import { Books } from 'src/app/shared/models/books';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{
  books:Books[]=[];
  userId:any;
  totalItemsInCart:any;

  constructor(
    private bookService:BookServiceService,
    private cartService:CartService){}
  ngOnInit(): void {
    this.getBooks();
    this.getTotalItemsFromCart();
  }
  
  getBooks(){
    this.bookService.getAllBooks().subscribe((response)=>{
      this.books=response;
      console.log(this.books);
    });
  }

  getTotalItemsFromCart() {
    this.userId = localStorage.getItem('userId');
    this.cartService.getAllBooksFromCart(this.userId).subscribe((response: any) => {
      this.totalItemsInCart = response.cartItems.length;
      console.log(response);
      this.updateData()
    });
  }

  updateData() {
    this.cartService.updateData(this.totalItemsInCart);
  }
}
