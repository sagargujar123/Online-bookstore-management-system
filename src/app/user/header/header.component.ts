import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DialogService]
})
export class HeaderComponent implements OnInit {
  totalItemsInCart: any;
  visible: boolean = false;

  userName:any;
  loginUserId:any;

  ref!: DynamicDialogRef;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private dialogService:DialogService
    ) {
    this.cartService.data$.subscribe(newValue => {
      this.totalItemsInCart = newValue;
    });
  }

  ngOnInit(): void { 
    this.userName=localStorage.getItem('userName');
    this.loginUserId=localStorage.getItem('userId');
  }

  logout() {
    this.authService.isLogout();
  }
  showDialog() {
    this.visible = true;
  }

  showProfileDialog(){
    this.visible=false;
    localStorage.setItem('updateUserId',this.loginUserId)

    this.ref = this.dialogService.open(UserProfileComponent, {
      header: 'Profile',
      width: '680px',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }
}
