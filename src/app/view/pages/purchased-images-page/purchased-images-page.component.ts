import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';
import { IImage } from 'src/app/models/i-image';
import { ImageState } from 'src/app/state/images.state';

@Component({
  selector: 'app-purchased-images-page',
  templateUrl: './purchased-images-page.component.html',
  styleUrls: ['./purchased-images-page.component.scss'],
})
export class PurchasedImagesPageComponent implements OnInit {
  @Select(ImageState.purchased) images$: Observable<IImage[]>;
  constructor() {}

  ngOnInit(): void {}
}
