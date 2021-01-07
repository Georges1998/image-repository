import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { IImage } from 'src/app/models/i-image';
import { IUser } from 'src/app/models/i-user';
import { DeleteImage } from 'src/app/state/images.actions';
import { ImageState } from 'src/app/state/images.state';
import { UserState } from 'src/app/state/user.state';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}
  user: IUser;
  @Select(ImageState.images) images$: Observable<IImage[]>;
  @Select(UserState.user) user$: Observable<IUser>;
  ngOnInit(): void {
    this.user$.subscribe((e) => {
      this.user = e;
    });
  }

  deleteImage(id: string) {
    this.store
      .dispatch(
        new DeleteImage({
          id: id,
        })
      )
      .pipe(
        catchError((err: any, caught) => {
          return of(err);
        })
      )
      .subscribe(() => {
        window.location.reload();
      });
  }
}
