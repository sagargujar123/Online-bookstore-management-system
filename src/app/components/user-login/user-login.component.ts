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
  hide = true;
  loginForm!: FormGroup;

  constructor(private formbuilder: FormBuilder, private loginService: LoginServiceService, private router: Router) { }
  
  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9]*$')]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[0-9])(?=.*[^\w\*])[^\s]{8,20}$')])
    });
  }

  userLogin() {
    this.loginService.sendLoginData(this.loginForm.value).subscribe((result) => {
      console.log(result);
      this.router.navigate(['/signup']);
    });
  }
}
