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
  constructor(
    private http: HttpClient,
    private imageshttpClient: ImagesHttpClient
  ) {}
  selectedFile: File = null;
  @Select(ImageState.images) images$: Observable<IImage[]>;

  ngOnInit(): void {}

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onUpload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile);
    fd.append('upload_preset', 'j4kjc2wq');
    this.http
      .post('https://api.cloudinary.com/v1_1/donxt20bs/upload', fd)
      .subscribe((res) => {
        var url: string = res['secure_url'];
        this.imageshttpClient
          .addNewImage(
            {
              title: 'george',
              url: url,
              price: 23,
            },
            localStorage.getItem('currentUser')
          )
          .subscribe((data) => {
            console.log(data);
          });
        console.log(url);
      });
  }
}
