import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IImage } from 'src/app/models/i-image';
import { ImageState } from 'src/app/state/images.state';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  constructor() {}
  @Select(ImageState.purchased) images$: Observable<IImage[]>;
  ngOnInit(): void {}
}
