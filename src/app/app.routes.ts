import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SCREENS } from './utils/constants';

export const routes: Routes = [
    { path: '', redirectTo: SCREENS.LOGIN, pathMatch: 'full' },
    { path: SCREENS.HOME, component: HomeComponent },
    { path: SCREENS.LOGIN, component: LoginComponent },
    { path: '**', redirectTo: '' }
  ];
