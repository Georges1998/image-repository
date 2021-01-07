import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IUser } from '../models/i-user';

@Injectable({
  providedIn: 'root',
})
export class UserHttpClient {
  private buyUrl = 'http://localhost:3000/buy';
  private getUser = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}
  buyNewImage(id: string, imageId: string): Observable<IUser> {
    const url = `${this.buyUrl}/${id}/${imageId}`;
    return this.http.post<IUser>(url, {});
  }

  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.getUser}/${id}`);
  }
}
