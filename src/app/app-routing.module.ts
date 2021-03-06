import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { 
  redirectUnauthorizedTo,
  canActivate
} from '@angular/fire/auth-guard';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SigninComponent } from './signin/signin.component';
import { SettingsComponent } from './settings/settings.component';

const redirectUnauthorizedToSignin = () => redirectUnauthorizedTo(['signin']);

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent, 
    ...canActivate(redirectUnauthorizedToSignin)},
  { path: 'dashboard', component: DashboardComponent, 
    ...canActivate(redirectUnauthorizedToSignin)},
  { path: 'detail/:key', component: HeroDetailComponent, 
    ...canActivate(redirectUnauthorizedToSignin)},
  { path: 'account', component: SettingsComponent},
  { path: '', redirectTo: '/account', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
