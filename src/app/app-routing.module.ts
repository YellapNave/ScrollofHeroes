import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate
} from '@angular/fire/auth-guard';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SigninComponent } from './signin/signin.component';

const redirectUnauthorizedToSignin = () => redirectUnauthorizedTo(['signin']);

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent, 
    ...canActivate(redirectUnauthorizedToSignin)},
  { path: 'dashboard', component: DashboardComponent, 
    ...canActivate(redirectUnauthorizedToSignin)},
  { path: 'detail/:key', component: HeroDetailComponent, 
    ...canActivate(redirectUnauthorizedToSignin)},
  { path: 'signin', component: SigninComponent},
  { path: '', redirectTo: '/signin', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
