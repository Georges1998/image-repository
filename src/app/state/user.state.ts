import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IImage } from '../models/i-image';
import { IUser } from '../models/i-user';
import { AuthService } from '../services/auth.service';
import { GetCurrentUser, SignUpUser } from './user.action';

export class UserStateModel {
  user: IUser;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: null,
  },
})
@Injectable()
export class UserState {
  constructor(
    private authService: AuthService,

    private store: Store
  ) {}
  @Selector()
  public static user(state: UserStateModel): IUser {
    return state.user;
  }
  @Action(GetCurrentUser)
  login(ctx: StateContext<UserStateModel>, action: GetCurrentUser) {
    const state = ctx.getState();
    let query = {};

    return this.authService
      .login(action.payload.email, action.payload.password)
      .pipe(
        tap((res) => {

          ctx.setState({
            ...state,
            user: res,
          });
          console.log(ctx.getState())
        }),
        catchError((err: HttpErrorResponse) => {
          alert('Please try again.');
          return throwError(new Error(err.message));
        })
      );
  }
  @Action(SignUpUser)
  registerUser(ctx: StateContext<UserStateModel>, action: SignUpUser) {
    const state = ctx.getState();
    let query = {};

    return this.authService
      .signup(
        action.payload.email,
        action.payload.lastName,
        action.payload.password,
        action.payload.firstName
      )
      .pipe(
        tap((res) => {
          ctx.setState({
            ...state,
            user: res,
          });
        }),
        catchError((err: HttpErrorResponse) => {
          alert('Please try again.');
          return throwError(new Error(err.message));
        })
      );
  }
}
