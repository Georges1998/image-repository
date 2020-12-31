import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IImage } from '../models/i-image';
import { ImagesHttpClient } from '../services/images-http-client';
import { GetAllImagesForUser } from './images.actions';

export class ImageStateModel {
  images: IImage[];
}

@State<ImageStateModel>({
  name: 'image',
  defaults: {
    images: [],
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
}
