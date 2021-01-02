import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IImage } from '../models/i-image';
import { ImagesHttpClient } from '../services/images-http-client';
import {
  GetAllImagesForUser,
  GetAllPurchasedImagesForUser,
} from './images.actions';

export class ImageStateModel {
  images: IImage[];
  purchased: IImage[];
}

@State<ImageStateModel>({
  name: 'image',
  defaults: {
    images: [],
    purchased: [],
  },
})
@Injectable()
export class ImageState {
  constructor(
    private imageshttpClient: ImagesHttpClient,

    private store: Store
  ) {}
  @Selector()
  public static images(state: ImageStateModel): IImage[] {
    return state.images;
  }
  @Selector()
  public static purchased(state: ImageStateModel): IImage[] {
    return state.purchased;
  }

  @Action(GetAllImagesForUser)
  getAllImagesForUser(
    ctx: StateContext<ImageStateModel>,
    action: GetAllImagesForUser
  ) {
    const state = ctx.getState();
    let query = {};

    return this.imageshttpClient.getallUsersImages(action.payload.id).pipe(
      tap((res) => {
        ctx.setState({
          ...state,
          images: res,
        });
      }),
      catchError((err: HttpErrorResponse) => {
        alert('Please try again.');
        return throwError(new Error(err.message));
      })
    );
  }
  @Action(GetAllPurchasedImagesForUser)
  getAllPurchasedForUser(
    ctx: StateContext<ImageStateModel>,
    action: GetAllPurchasedImagesForUser
  ) {
    const state = ctx.getState();
    let query = {};

    return this.imageshttpClient.getAllPurchasedImages(action.payload.id).pipe(
      tap((res) => {
        ctx.setState({
          ...state,
          purchased: res,
        });
      }),
      catchError((err: HttpErrorResponse) => {
        alert('Please try again.');
        return throwError(new Error(err.message));
      })
    );
  }
}
