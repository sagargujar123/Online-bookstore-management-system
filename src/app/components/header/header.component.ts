import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private messageService: MessageService) {

  }
  ngOnInit(): void { }

  // logout() {
  //   if (localStorage.length !== 0) {
  //     this.messageService.add({ severity: 'success', summary: 'success', detail: 'User Logout Successfully' });
  //   }
  //   this.authService.isLogout();
  // }
}
