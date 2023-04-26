import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // currentUser$: any;

  constructor(
    private router:Router,
    private messageService: MessageService) { }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  isLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'User Logout Successfully',life: 3000 });
    this.router.navigate(['login']);
  }
}
