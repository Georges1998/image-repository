import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IImage } from 'src/app/models/i-image';
import { IUser } from 'src/app/models/i-user';
import { ImageState } from 'src/app/state/images.state';
import { UserState } from 'src/app/state/user.state';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  constructor() {}
  @Select(ImageState.images) images$: Observable<IImage[]>;
  @Select(UserState.user) user$: Observable<IUser>;
  ngOnInit(): void {}
}
