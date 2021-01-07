import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../models/i-user';
import { GetUser } from './user.action';
import { UserState } from './user.state';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<IUser> {
  constructor(private store: Store) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IUser | Observable<IUser> | Promise<IUser> {
    return this.store
      .dispatch(new GetUser({ id: localStorage.getItem('currentUser') }))
      .pipe(
        catchError((err: any, caught) => {
          return of(err);
        }),
        map((v) => {
          if (v instanceof HttpErrorResponse) {
            return { error: v };
          }
          const dataState = this.store.selectSnapshot(UserState);
          return dataState.user;
        })
      );
  }
}
