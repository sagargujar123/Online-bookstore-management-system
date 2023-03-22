import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  orderedBooks:any=[];
  
  constructor(private orderService:OrderService, private router:Router){}
  ngOnInit(): void {
    this.getOrderdBooks();
  }

  getOrderdBooks(){
    this.orderService.getOrderdBooks().subscribe((response)=>{
      this.orderedBooks=response;
      console.log(response);
    })
  }
  
  payAmount(){
    this.router.navigate(['orderlist']);
  }
}
