import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IImage } from 'src/app/models/i-image';
import { IUser } from 'src/app/models/i-user';
import { ImageState } from 'src/app/state/images.state';
import { BuyImage } from 'src/app/state/user.action';
import { UserState } from 'src/app/state/user.state';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}
  @Select(ImageState.random) images$: Observable<IImage[]>;

  @Select(UserState.user) user$: Observable<IUser>;
  @Select(UserState.message) message$: Observable<string>;
  disableBuy: boolean = false;
  ngOnInit(): void {
    this.message$.subscribe((e) => {
      if (e != '') {
        alert(e);
      }
    });
  }

  buyImage(imageId: string) {
    this.disableBuy = true;
    this.store
      .dispatch(
        new BuyImage({
          id: localStorage.getItem('currentUser'),
          imageId: imageId,
        })
      )
      .pipe(
        catchError((err: any, caught) => {
          this.disableBuy = false;
          return of(err);
        })
      )
      .subscribe(() => {
        this.disableBuy = false;
        this.router.navigate(['/purchased']);
      });
  }
  refreshPage() {
    window.location.reload();
  }
}
