import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { catchError } from 'rxjs/operators';
import { AuthGuard } from 'src/app/services/auth-guard';
import { AuthService } from 'src/app/services/auth.service';
import { GetCurrentUser, SignUpUser } from 'src/app/state/user.action';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent implements OnInit {
  items: any;
  disableSignup: boolean = false;
  disableLogin: boolean = false;
  error: string = '';
  checkoutForm;
  signupForm;

  constructor(
    private authguard: AuthGuard,
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store
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
    this.disableLogin = true;
    this.store
      .dispatch(
        new GetCurrentUser({
          email: customerData.email,
          password: customerData.password,
        })
      )
      .subscribe((data) => {
        this.disableLogin = false;
        this.router.navigate(['/']);
      });
  }

  signup(customerData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    this.disableSignup = true;
    this.store
      .dispatch(
        new SignUpUser({
          email: customerData.email,
          password: customerData.password,
          firstName: customerData.firstName,
          lastName: customerData.lastName,
        })
      )
      .subscribe((data) => {
        this.disableSignup = false;
        if (data) {
          this.router.navigate(['/']);
        } else {
          this.disableSignup = false;
        }
      });
  }
}
