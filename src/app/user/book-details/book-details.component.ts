import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BookServiceService } from 'src/app/services/book-service.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  loading!: boolean;
  book: any;
  cartId: any;
  bookId: any;
  userId: any;
  quantity: any;

  ngOnInit(): void {
    this.getBook();
  }
  constructor(
    private bookService: BookServiceService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private messageService: MessageService) { }

  getBook() {
    this.loading = true;
    this.bookService.getBookById(this.route.snapshot.params['id']).subscribe((response) => {
      this.book = response;
      console.log(response);
      this.loading = false;
    });
  }

  addToCart(book: any) {
    const payload = {
      bookId: book.id,
      userId: localStorage.getItem('userId')
    }
    if (book.availableQuantity == 0) {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'Sorry, book is Not Available' });
    }
    else {
      this.cartService.addBookToCart(payload).subscribe((response: any) => {
        console.log(response);
        if (response.statusCode === 201) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
        }
      });
    }
  }
}
