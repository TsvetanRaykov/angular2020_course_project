import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'user',
    children: [
      { path: '', pathMatch: 'full', component: RegisterComponent },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  }
];
export const UserRoutingModule = RouterModule.forChild(routes);
