import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IImage } from '../models/i-image';

@Injectable({
  providedIn: 'root',
})
export class ImagesHttpClient {
  private url = 'http://localhost:3000/image';

  baseUrl = this.url;

  constructor(private http: HttpClient) {}

  getallUsersImages(id: string): Observable<IImage[]> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<IImage[]>(url);
  }
}
