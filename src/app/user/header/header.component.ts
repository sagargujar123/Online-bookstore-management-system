import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalItemsInCart:any;

  constructor(
    private authService: AuthService,
    private cartService:CartService) { 
      this.cartService.data$.subscribe(newValue =>{
        this.totalItemsInCart=newValue;
      });
    }

  ngOnInit(): void {}

  logout() {
    this.authService.isLogout();
  }
}
