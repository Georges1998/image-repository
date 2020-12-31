import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard';
import { HomePageComponent } from './view/pages/home-page/home-page.component';
import { SignUpPageComponent } from './view/pages/sign-up-page/sign-up-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: SignUpPageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
