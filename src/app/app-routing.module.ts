import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard';
import { ImageResolver } from './state/images.resolver';
import { HomePageComponent } from './view/pages/home-page/home-page.component';
import { ProfilePageComponent } from './view/pages/profile-page/profile-page.component';
import { SignUpPageComponent } from './view/pages/sign-up-page/sign-up-page.component';
import { UploadPageComponent } from './view/pages/upload-page/upload-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard],
    resolve: {
      image: ImageResolver,
    },
  },
  { path: 'login', component: SignUpPageComponent },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'upload', component: UploadPageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
