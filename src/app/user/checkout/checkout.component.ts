import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  orderedBooks: any;
  userId: any;
  totalPrice: any;
  totalBooks: any;
  totalItemsInCart:any

  constructor(
    private orderService: OrderService,
    private router: Router,
    private cartService:CartService) { }

  ngOnInit(): void {
    this.getOrderdBooks();
  }

  getOrderdBooks() {
    this.userId = localStorage.getItem('userId');
    this.orderService.getOrderdBooks(this.userId).subscribe((response: any) => {
      this.orderedBooks = response.cartItems;
      this.totalPrice = response.totalCost;
      this.totalBooks = response.totalBooks;
      this.totalItemsInCart=this.orderedBooks.length;
      this.updateData();
    });
  }

  updateData() {
    this.cartService.updateData(this.totalItemsInCart);
  }

  addAvailableOffers() {
    this.router.navigate(['user/orders']);
  }
}
