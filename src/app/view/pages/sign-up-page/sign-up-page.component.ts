import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AuthGuard } from 'src/app/services/auth-guard';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent implements OnInit {
  items: any;
  error: string = '';
  checkoutForm;
  signupForm;

  constructor(
    private authService: AuthService,
    private authguard: AuthGuard,
    private router: Router,
    // private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      email: '',
      password: '',
    });
    this.signupForm = this.formBuilder.group({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    });
  }

  ngOnInit() {
    if (this.authguard.canActivate) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(customerData: { email: string; password: string }) {
    // this.checkoutForm.reset();
    this.authService
      .login(customerData.email, customerData.password)
      .subscribe((data) => {
        this.router.navigate(['/']);
      });
  }

  signup(customerData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    this.authService
      .signup(
        customerData.email,
        customerData.password,
        customerData.firstName,
        customerData.lastName
      )
      .subscribe((data) => {
        if (data) {
          console.log(data);
          this.router.navigate(['/']);
        }else{
          console.log("boo")
        }
      });
  }
}
