import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../core/services/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'user',
    children: [
      { path: '', pathMatch: 'full', component: RegisterComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent }
    ]
  }
];
export const UserRoutingModule = RouterModule.forChild(routes);
