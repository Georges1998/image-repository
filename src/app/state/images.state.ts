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
  GetRandomImagesForUser,
} from './images.actions';

export class ImageStateModel {
  images: IImage[];
  purchased: IImage[];
  random: IImage[];
}

@State<ImageStateModel>({
  name: 'image',
  defaults: {
    images: [],
    purchased: [],
    random: [],
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
  @Selector()
  public static random(state: ImageStateModel): IImage[] {
    return state.random;
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
        console.log('getttttttt');
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
        console.log(res);
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

  @Action(GetRandomImagesForUser)
  GetRandomImagesForUser(
    ctx: StateContext<ImageStateModel>,
    action: GetAllPurchasedImagesForUser
  ) {
    const state = ctx.getState();
    let query = {};

    return this.imageshttpClient.getRandomImages(action.payload.id).pipe(
      tap((res) => {
        console.log(res);
        ctx.setState({
          ...state,
          random: res,
        });
      }),
      catchError((err: HttpErrorResponse) => {
        alert('Please try again.');
        return throwError(new Error(err.message));
      })
    );
  }
}
