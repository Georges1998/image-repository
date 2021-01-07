import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { IImage } from 'src/app/models/i-image';
import { IUser } from 'src/app/models/i-user';
import { ImagesHttpClient } from 'src/app/services/images-http-client';
import { DeleteImage } from 'src/app/state/images.actions';
import { ImageState } from 'src/app/state/images.state';
import { UserState } from 'src/app/state/user.state';
import { EditDialogComponent } from '../../components/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog,
    private imageshttpClient: ImagesHttpClient
  ) {}
  user: IUser;
  @Select(ImageState.images) images$: Observable<IImage[]>;
  @Select(UserState.user) user$: Observable<IUser>;
  @Select(UserState.message) message$: Observable<string>;
  ngOnInit(): void {
    this.user$.subscribe((e) => {
      this.user = e;
    });
    this.message$.subscribe((e) => {
      if (e != '') {
        alert(e);
      }
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

  openDialog(image: IImage) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      image: image,
    };

    const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) =>
      this.imageshttpClient.editImage(data, image._id).subscribe((s) => {
        alert(s.message);
        window.location.reload();
      })
    );
  }
}
