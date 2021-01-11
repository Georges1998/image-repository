import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IImage } from '../models/i-image';

@Injectable({
  providedIn: 'root',
})
export class ImagesHttpClient {
  private imageUrl = environment.apiUrl + '/image';
  private userUrl = environment.apiUrl + '/user';
  private purchaseUrl = environment.apiUrl + '/purchased';
  private randomUrl = environment.apiUrl + '/random';
  private buyUrl = environment.apiUrl + '/buy';

  constructor(private http: HttpClient) {}

  getallUsersImages(id: string): Observable<IImage[]> {
    const url = `${this.imageUrl}/${id}`;
    return this.http.get<IImage[]>(url);
  }

  deleteImage(id: string): Observable<any> {
    const url = `${this.imageUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  getRandomImages(id: string): Observable<IImage[]> {
    const url = `${this.randomUrl}/${id}`;
    return this.http.get<IImage[]>(url);
  }

  getAllPurchasedImages(id: string): Observable<IImage[]> {
    const url = `${this.purchaseUrl}/${id}`;
    return this.http.get<IImage[]>(url);
  }

  addNewImage(image: IImage, id: string): Observable<any> {
    const url = `${this.userUrl}/${id}`;
    return this.http.post<any>(url, image);
  }
  editImage(image: IImage, id: string): Observable<any> {
    const url = `${this.imageUrl}/${id}`;
    return this.http.put<any>(url, image);
  }
}
