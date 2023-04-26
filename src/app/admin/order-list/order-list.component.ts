import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OrderListService } from 'src/app/services/order-list.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orderList: any;
  totalOrders: any;

  constructor(
    private route: ActivatedRoute,
    private orderListService: OrderListService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList() {
    this.orderListService.getOrderListByUserId(this.route.snapshot.params['id']).subscribe((response: any) => {
      this.orderList = response.orderList;
      this.totalOrders = this.orderList.length;
      console.log(response);
    });
  }

  deleteOrder(orderId: any) {
    this.orderListService.deleteOrderByOrderId(orderId).subscribe((response: any) => {
      console.log(response);
      if (response.statusCode === 200) {
        this.messageService.add({ severity: 'success', summary: 'success', detail: response.message });
        this.getOrderList();
      }
    });
  }
}
