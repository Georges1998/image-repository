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
import { IImage } from '../models/i-image';
import { GetAllImagesForUser } from './images.actions';
import { ImageState } from './images.state';

@Injectable({
  providedIn: 'root',
})
export class ImageResolver implements Resolve<IImage[]> {
  constructor(private store: Store) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IImage[] | Observable<IImage[]> | Promise<IImage[]> {
    return this.store
      .dispatch(
        new GetAllImagesForUser({ id: localStorage.getItem('currentUser') })
      )
      .pipe(
        catchError((err: any, caught) => {
          return of(err);
        }),
        map((v) => {
          if (v instanceof HttpErrorResponse) {
            return { error: v };
          }
          const dataState = this.store.selectSnapshot(ImageState);
          return dataState.images;
        })
      );
  }
}
