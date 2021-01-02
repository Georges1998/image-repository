import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IImage } from 'src/app/models/i-image';
import { ImagesHttpClient } from 'src/app/services/images-http-client';
import { ImageState } from 'src/app/state/images.state';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor() {}
  @Select(ImageState.images) images$: Observable<IImage[]>;

  ngOnInit(): void {}
}
