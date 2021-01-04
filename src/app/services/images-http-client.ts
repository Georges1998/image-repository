import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IImage } from '../models/i-image';

@Injectable({
  providedIn: 'root',
})
export class ImagesHttpClient {
  private imageUrl = 'http://localhost:3000/image';
  private userUrl = 'http://localhost:3000/user';
  private purchaseUrl = 'http://localhost:3000/purchased';
  private randomUrl = 'http://localhost:3000/random';

  constructor(private http: HttpClient) {}

  getallUsersImages(id: string): Observable<IImage[]> {
    const url = `${this.imageUrl}/${id}`;
    return this.http.get<IImage[]>(url);
  }
  getRandomImages(id: string): Observable<IImage[]> {
    const url = `${this.randomUrl}/${id}`;
    return this.http.get<IImage[]>(url);
  }

  getAllPurchasedImages(id: string): Observable<IImage[]> {
    const url = `${this.purchaseUrl}/${id}`;
    console.log(url);
    return this.http.get<IImage[]>(url);
  }

  addNewImage(image: IImage, id: string): Observable<IImage> {
    const url = `${this.userUrl}/${id}`;
    return this.http.post<IImage>(url, image);
  }
}
