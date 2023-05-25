import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router:Router,
    private messageService: MessageService) { }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  isLogout(): void {
    localStorage.clear();
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'User Logout Successfully',life: 3000 });
    this.router.navigate(['login']);
  }
}
