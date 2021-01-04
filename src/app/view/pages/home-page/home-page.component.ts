import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IImage } from 'src/app/models/i-image';
import { IUser } from 'src/app/models/i-user';
import { ImagesHttpClient } from 'src/app/services/images-http-client';
import { ImageState } from 'src/app/state/images.state';
import { UserState } from 'src/app/state/user.state';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor() {}
  @Select(ImageState.random) images$: Observable<IImage[]>;

  @Select(UserState.user) user$: Observable<IUser>;
  ngOnInit(): void {
    this.user$.subscribe((e) => {
      console.log(e);
    });
  }
}
