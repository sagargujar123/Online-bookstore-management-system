import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orderList: any;
  totalOrders: any;
  userId: any;
  totalItemsInCart: any;

  selectedId: any;

  constructor(
    private orderService: OrderService,
    private cartService: CartService) { }

  ngOnInit(): void {
   this.getOrderList();
  }

  getOrderList(){
    const userId = localStorage.getItem('userId');
    this.orderService.getOrderList(userId).subscribe((response: any) => {
      this.orderList = response.orderList;
      this.totalOrders = this.orderList.length;
      console.log(response);
      console.log("orderlist: ",this.orderList)
      this.getTotalItemsFromCart();
    });
  }

  getTotalItemsFromCart() {
    this.userId = localStorage.getItem('userId');
    this.cartService.getAllBooksFromCart(this.userId).subscribe((response: any) => {
      this.totalItemsInCart = response.cartItems.length;
      console.log(response);
      this.updateData();
    });
  }

  updateData() {
    this.cartService.updateData(this.totalItemsInCart);
  }

  selected(id: any) {
    this.selectedId = id;
  }
}
