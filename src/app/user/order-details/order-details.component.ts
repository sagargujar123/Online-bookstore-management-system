import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  id: any;
  orderData: any;
  orderItems: any;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.currentOrder();
  }

  currentOrder() {
    this.orderService.getOrderByOrderId(this.id).subscribe((response: any) => {
      this.orderData = response;
      this.orderItems = this.orderData.orderItemList;
      console.log(response);
    });
  }
}
