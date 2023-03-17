import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  hide = true;
  confhide = true;
  signupForm!: FormGroup;
  constructor(private formbuilder: FormBuilder, private loginService: LoginServiceService, private router: Router) { }
  
  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      username: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9]*$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', [Validators.required, Validators.pattern('[7-9]{1}[0-9]{9}')]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$')]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }
  validateSubmit() {
    if (this.signupForm.controls['password'].value != this.signupForm.controls['confirmPassword'].value) {
      return true;
    }
    else {
      return false;
    }
  }

  userSignUp() {
    var formData = this.signupForm.value;
    var data = {
      name: formData.username,
      email: formData.email,
      contactNumber: formData.contact,
      password: formData.password
    }

    this.loginService.sendSignUpData(data).subscribe((result) => {
      console.log(result);
      this.router.navigate(['/login']);
      this.signupForm.reset();
    });
  }
  // goToLogin() {
  //   this.router.navigate(['/login']);
  // }
}
