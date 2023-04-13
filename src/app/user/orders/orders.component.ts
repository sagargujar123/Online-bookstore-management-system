import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderItem: any;
  userId = localStorage.getItem('userId');

  orderId: any;
  orderDate: any;
  totalCost: any;
  paymentStatus: any;

  constructor(
    private orderService: OrderService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    this.orderService.getOrderByUserId(this.userId).subscribe((response: any) => {
      this.orderItem = response.orderItemList;

      this.orderId = response.orderId;
      this.orderDate = response.orderDate;
      this.totalCost = response.totalCost;
      this.paymentStatus = response.paymentStatus;

      console.log(response);
      if (response.statusCode === 201) {
        this.messageService.add({ severity: 'success', summary: 'success', detail: response.message });
      }
    });
  }
}
