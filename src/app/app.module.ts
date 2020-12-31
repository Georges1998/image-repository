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
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SignUpPageComponent,
    HomePageComponent,
  ],
  imports: [
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'donxt20bs' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
