import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/i-user';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('currentUser') != null) {
      this.currentUserSubject = new BehaviorSubject<any>(
        localStorage.getItem('currentUser')
      );
      this.currentUser = this.currentUserSubject.asObservable();
    } else {
      this.currentUserSubject = new BehaviorSubject<any>('');
    }
  }

  signup(email: string, lastName: string, password: string, firstName: string) {
    return this.http
      .post<IUser>(
        environment.apiUrl + '/user',
        {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        },
        { withCredentials: true }
      )
      .pipe(
        map((u) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', u._id);
          this.currentUserSubject.next(u._id);
          return u;
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<IUser>(
        environment.apiUrl + '/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', user._id);
          this.currentUserSubject.next(user._id);
          return user;
        }),
        catchError((err) => {
          throw 'Error in source. Details: ' + err.message;
        })
      );
  }

  public get currentUserValue(): IUser {
    if (this.currentUserSubject) {
      return this.currentUserSubject.value;
    } else {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return this.http.post<any>(environment.apiUrl + '/logout', {});
  }
}
