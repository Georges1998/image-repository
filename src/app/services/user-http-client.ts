import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IUser } from '../models/i-user';

@Injectable({
  providedIn: 'root',
})
export class UserHttpClient {
  private buyUrl = environment.apiUrl + '/buy';
  private getUser = environment.apiUrl + '/user';

  constructor(private http: HttpClient) {}
  buyNewImage(id: string, imageId: string): Observable<any> {
    const url = `${this.buyUrl}/${id}/${imageId}`;
    return this.http.post<any>(url, {});
  }

  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.getUser}/${id}`);
  }
}
