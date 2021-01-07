import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';
import { IImage } from 'src/app/models/i-image';
import { ImageState } from 'src/app/state/images.state';
import { EditDialogComponent } from '../../components/edit-dialog/edit-dialog.component';

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
