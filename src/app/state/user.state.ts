import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IImage } from '../models/i-image';
import { IUser } from '../models/i-user';
import { AuthService } from '../services/auth.service';
import { UserHttpClient } from '../services/user-http-client';
import { BuyImage, GetCurrentUser, GetUser, SignUpUser } from './user.action';

export class UserStateModel {
  user: IUser;
  message: string;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: null,
    message: '',
  },
})
@Injectable()
export class UserState {
  constructor(
    private authService: AuthService,
    private userHttpClient: UserHttpClient,

    private store: Store
  ) {}
  @Selector()
  public static user(state: UserStateModel): IUser {
    return state.user;
  }
  @Selector()
  public static message(state: UserStateModel): string {
    return state.message;
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
        }),
        catchError((err: HttpErrorResponse) => {
          alert('Please try again.');
          return throwError(new Error(err.message));
        })
      );
  }
  @Action(GetUser)
  getUser(ctx: StateContext<UserStateModel>, action: GetUser) {
    const state = ctx.getState();
    let query = {};

    return this.userHttpClient
      .getUserById(action.payload.id)
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
  @Action(BuyImage)
  buyImage(ctx: StateContext<UserStateModel>, action: BuyImage) {
    const state = ctx.getState();
    let query = {};

    return this.userHttpClient
      .buyNewImage(action.payload.id, action.payload.imageId)
      .pipe(
        tap((res) => {
          ctx.setState({
            ...state,
            user: res.user,
            message: res.message
          });
        }),
        catchError((err: HttpErrorResponse) => {
          alert('Please try again.');
          return throwError(new Error(err.message));
        })
      );
  }
}
