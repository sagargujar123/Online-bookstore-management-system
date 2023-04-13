import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orderList: any;
  userId = localStorage.getItem('userId');
  totalOrders: any;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrderList(this.userId).subscribe((response: any) => {
      this.orderList = response.orderList;
      this.totalOrders = this.orderList.length;
      console.log(response);
    });
  }
}
