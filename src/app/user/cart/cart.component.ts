import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  booksInCart: any;
  totalBooks!: number;
  totalPrice!: number;
  userId: any;
  cartId: any;
  bookId: any;
  bookQuantity!: number;
  totalItemsInCart: any;

  constructor(
    private cartService: CartService,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.showBooksInCart();
  }

  showBooksInCart() {
    this.userId = localStorage.getItem('userId');
    this.cartService.getAllBooksFromCart(this.userId).subscribe((response: any) => {

      this.booksInCart = response.cartItems;
      this.totalPrice = response.totalCost;
      this.totalBooks = response.totalBooks;
      this.totalItemsInCart = this.booksInCart.length;
      console.log("len: ",this.totalItemsInCart)

      console.log(response);
      this.updateData();
    });
  }

  removeBookFromCart(bookId: any) {
    this.cartService.deleteBookById(bookId).subscribe((response: any) => {
      console.log(response);
      if (response.statusCode == 200) {
        this.totalItemsInCart--;
        this.updateData();

        this.messageService.add({ severity: 'success', summary: 'success', detail: response.message, life: 3000 });
        this.showBooksInCart();
      }
    });
  }

  updateData() {
    this.cartService.updateData(this.totalItemsInCart);
  }

  decreaseQty(book: any) {
    if (book.quantity <= 1) {
      book.quantity = 1;
    }
    else {
      book.quantity--;
      this.totalBooks -= 1;
      this.totalPrice -= book.books.price;

      this.cartId = book.cartId;
      this.bookQuantity = book.quantity;
      this.bookId = book.books.id;

      this.updateCart();
    }
  }

  increaseQty(book: any) {
    book.quantity++;
    this.totalBooks += 1;
    this.totalPrice += book.books.price;

    this.cartId = book.cartId;
    this.bookQuantity = book.quantity;
    this.bookId = book.books.id;
    if (book.quantity <= book.books.availableQuantity) {
      this.updateCart();
    }

    if (book.books.availableQuantity < book.quantity) {
      book.quantity;
      this.totalBooks;
      this.totalPrice;

      this.cartId = book.cartId;
      this.bookQuantity = book.quantity;
      this.bookId = book.books.id;
      this.updateCart();
      this.showBooksInCart();
    }
  }

  updateCart() {
    const payload = {
      userId: localStorage.getItem('userId'),
      cartId: this.cartId,
      quantity: this.bookQuantity,
      bookId: this.bookId
    }
    this.cartService.updateCart(payload).subscribe((response: any) => {
      console.log(response);
      if (response.statusCode == 200) {
        this.messageService.add({ severity: 'success', summary: 'success', detail: response.message, life: 3000 });
      }
    });
  }

  checkOut() {
    this.router.navigate(['user/checkout']);
  }
}
