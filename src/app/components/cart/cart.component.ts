import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  booksInCart:any=[];
  totalPrice:number=0;

  constructor(private cartService:CartService, private router:Router, private orderService:OrderService){}
  ngOnInit(): void {
    this.addBooksInCart();
  }

  addBooksInCart(){
    this.cartService.getAllBooksFromCart().subscribe((response)=>{
      this.booksInCart=response;
      console.log(response);
    })
  }

  removeBookFromCart(bookId:any){
    this.cartService.deleteBookById(bookId).subscribe((response)=>{
      console.log(response);
      this.addBooksInCart();
    });
  }

  decreaseQty(book:any){
    if(book.quantity<=1){
      book.quantity=1;
      this.totalPrice=book.quantity*book.price;
    }else{
      book.quantity--;
      this.totalPrice=book.quantity*book.price;
    }
  }

  increaseQty(book:any){
    book.quantity++;
    this.totalPrice=book.quantity*book.price;
  }
  
  checkOut(){
    this.orderService.addBooksToOrder(this.booksInCart).subscribe((response)=>{
      console.log(response);
    });
    this.router.navigate(['orders']);
  }
}
