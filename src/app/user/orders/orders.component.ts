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
  discount: any;
  actualAmount: any;
  promoCodeForm!: FormGroup;
  promoCode: any;
  totalItemsInCart: any;
  responsiveOptions!:any[];

  constructor(
    private orderService: OrderService,
    private offerListService: OfferListService,
    private messageService: MessageService,
    private router: Router,
    private formbuilder: FormBuilder,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.getAllOffers();
    this.getOrder();

    this.promoCodeForm = this.formbuilder.group({
      offerCode: new FormControl('')
    });

    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
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
      this.totalItemsInCart = this.orderItems.length;
      this.totalCost = response.totalCost;

      console.log(response);
      this.updateData();
    });
  }

  addPromoCode(promoCode: any) {
    this.promoCodeForm.patchValue({
      offerCode: promoCode
    });
    console.log(promoCode);
  }

  applyOffer(code: any) {
    const payload = {
      userId: this.userId,
      promoCode: code,
      totalCost: this.totalCost
    }
    this.promoCodeForm.reset();

    this.offerListService.applyOffer(payload).subscribe((response: any) => {
      console.log(response);

      if (response.statusCode === 200) {
        this.discount = response.data.discountAmount;
        this.actualAmount = response.data.actualAmount;
        this.promoCode = response.data.promoCode;
        this.messageService.add({ severity: 'success', summary: 'success', detail: response.message });
      }
    });
  }

  payAmount() {
    if (this.promoCode != null) {
      const payload = {
        promoCode: this.promoCode,
        userId: this.userId
      }
      this.orderService.addOrderByUserId(payload).subscribe((response: any) => {
        if (response.statusCode === 201) {
          this.messageService.add({ severity: 'success', summary: 'success', detail: response.message });
          this.orderId = response.data.orderId;
          this.getTotalItemsFromCart();
        }
        console.log(response);
      });
    } else {
      const payload = {
        userId: this.userId
      }
      this.orderService.addOrderByUserId(payload).subscribe((response: any) => {
        if (response.statusCode === 201) {
          this.messageService.add({ severity: 'success', summary: 'success', detail: response.message });
          this.orderId = response.data.orderId;
          this.getTotalItemsFromCart();
        }
        console.log(response);
      });
    }
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
}
