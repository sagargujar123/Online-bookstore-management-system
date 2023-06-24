import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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

  constructor(
    private formbuilder: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z ]*$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', [Validators.required, Validators.pattern('[7-9]{1}[0-9]{9}')]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$')]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  validateSubmit() {
    if (this.signupForm.controls['password'].value != this.signupForm.controls['confirmPassword'].value) {
      return true;
    } else {
      return false;
    }
  }

  userSignUp() {
    if(this.signupForm.invalid || this.validateSubmit()){
      this.signupForm.markAllAsTouched();
      return;
    }

    var formData = this.signupForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contact,
      password: formData.password
    }

    this.loginService.userSignUpData(data).subscribe((response) => {
      console.log(response);
      if (response.statusCode === 200) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
        this.signupForm.reset();
        this.router.navigate(['login']);
      }
    });
  }
}
