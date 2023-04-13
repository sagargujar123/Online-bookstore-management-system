import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  userId: any;
  userRole: any;

  constructor(private formbuilder: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['user']);
    }

    this.loginForm = this.formbuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9!@#$%^&*`.,\"]*$')])
    });
  }

  userLogin() {
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password
    }

    this.loginService.userLoginData(data).subscribe((response) => {
      this.userRole = response.data.role;
      localStorage.setItem('token', response.data.sessionToken);
      localStorage.setItem('userId', response.data.id);
      console.log(response);

      if (response.statusCode == 200) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message, life: 3000 });
        if (this.userRole == "user") {
          this.router.navigate(['user']);
        } else {
          this.router.navigate(['admin']);
        }
      }
    });
  }
}
