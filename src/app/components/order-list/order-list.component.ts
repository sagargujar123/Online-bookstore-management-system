import { Component } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  product=[
    {
      id:2,
      name:"books",
      imageUrl:"https://cdn01.sapnaonline.com/product_media/9789387496699/sm_9789387496699_040520221653921.jpg",
      qty:2,
      price:200,
      date:"02/10/2023",
      status:"Successful"
    },
    {
      id:3,
      name:"books",
      imageUrl:"https://cdn01.sapnaonline.com/product_media/9789387496699/sm_9789387496699_040520221653921.jpg",
      qty:2,
      price:200,
      date:"02/10/2023",
      status:"Successful"
    }
  ]
}
