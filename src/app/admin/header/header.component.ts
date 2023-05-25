import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName:any;
  visible:boolean=false;

  constructor(
    private authService: AuthService) {
  }
  ngOnInit(): void { 
    this.userName=localStorage.getItem('userName');
  }

  showDialog(){
    this.visible=true;
  }

  logout() {
    this.authService.isLogout();
  }
}
