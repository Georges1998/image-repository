import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './view/components/nav-bar/nav-bar.component';
import { SignUpPageComponent } from './view/pages/sign-up-page/sign-up-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './view/pages/home-page/home-page.component';
import * as Cloudinary from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { NgxsModule } from '@ngxs/store';
import { ImageState } from './state/images.state';
import { ProfilePageComponent } from './view/pages/profile-page/profile-page.component';
import { UploadPageComponent } from './view/pages/upload-page/upload-page.component';
import { PurchasedImagesPageComponent } from './view/pages/purchased-images-page/purchased-images-page.component';
import { UserState } from './state/user.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { EditDialogComponent } from './view/components/edit-dialog/edit-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FooterComponent } from './view/components/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SignUpPageComponent,
    HomePageComponent,
    ProfilePageComponent,
    UploadPageComponent,
    PurchasedImagesPageComponent,
    EditDialogComponent,
    FooterComponent,
  ],
  imports: [
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'donxt20bs' }),
    HttpClientModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([ImageState, UserState]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
