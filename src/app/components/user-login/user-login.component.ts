import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formbuilder: FormBuilder, private loginService: LoginServiceService, private router: Router) { }
  
  ngOnInit(): void {
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
      localStorage.setItem('token',response.token)
      console.log(response);
      this.router.navigate(['books']);
    });
  }
}
