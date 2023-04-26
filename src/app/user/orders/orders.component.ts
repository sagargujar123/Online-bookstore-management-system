import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/services/cart.service';
import { OfferListService } from 'src/app/services/offer-list.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  offers: any;
  orderItems: any;
  userId = localStorage.getItem('userId');

  orderId: any;
  orderDate: any;
  totalCost: any;
  paymentStatus: any;
  showInputBox: boolean = true;
  discount: any;
  actualAmount: any;
  promoCodeForm!: FormGroup;

  constructor(
    private orderService: OrderService,
    private offerListService: OfferListService,
    private messageService: MessageService,
    private router: Router,
    private formbuilder: FormBuilder,
    private cartService:CartService) { }

  ngOnInit(): void {
    this.getAllOffers();
    this.getOrder();

    this.promoCodeForm = this.formbuilder.group({
      offerCode: new FormControl('')
    })
  }

  getAllOffers() {
    this.offerListService.getAllOffers().subscribe((response: any) => {
      this.offers = response;
      console.log(response);
    });
  }

  getOrder() {
    this.orderService.getOrderByUserId(this.userId).subscribe((response: any) => {
      this.orderItems = response.orderItemList;

      this.orderId = response.orderId;
      this.orderDate = response.orderDate;
      this.totalCost = response.totalCost;
      this.paymentStatus = response.paymentStatus;

      console.log(response);
    });
  }

  addPromoCode(promoCode: any) {
    this.promoCodeForm.patchValue({
      offerCode: promoCode
    });
    console.log(promoCode);
  }

  applyOffer(code: any) {
    this.showInputBox = false;
    const payload = {
      userId: this.userId,
      orderId: this.orderId,
      promoCode: code,
      totalCost: this.totalCost
    }
    this.promoCodeForm.reset();

    this.offerListService.applyOffer(payload).subscribe((response: any) => {
      console.log(response);

      if (response.statusCode === 200) {
        this.discount = response.discountAmount;
        this.actualAmount = response.actualAmount;
        this.messageService.add({ severity: 'success', summary: 'success', detail: response.message });
      }
    });
  }

  payAmount() {
    this.updateData();
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Order Placed Successfully' });
    this.router.navigate(['user/orderlist']);
  }

  updateData() {
    this.cartService.updateData(0);
  }
}
