import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ImagesHttpClient } from 'src/app/services/images-http-client';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss'],
})
export class UploadPageComponent implements OnInit {
  checkoutForm;
  selectedFile: File = null;
  disableButton: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private imageshttpClient: ImagesHttpClient,
    private router: Router
  ) {
    this.checkoutForm = this.formBuilder.group({
      title: '',
      price: 0,
      image: null,
    });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit(): void {}

  onSubmit(customerData: { title: string; price: number }) {
    const fd = new FormData();
    fd.append('file', this.selectedFile);
    fd.append('upload_preset', 'j4kjc2wq');
    this.disableButton = true;
    this.http
      .post('https://api.cloudinary.com/v1_1/donxt20bs/upload', fd)
      .subscribe((res) => {
        var url: string = res['secure_url'];
        this.imageshttpClient
          .addNewImage(
            {
              title: customerData.title,
              url: url,
              price: customerData.price,
            },
            localStorage.getItem('currentUser')
          )
          .subscribe((data) => {
            this.checkoutForm.reset();
            this.router.navigate(['/profile']);
          });
      });
  }
}
