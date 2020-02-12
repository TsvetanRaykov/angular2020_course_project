import { Routes, RouterModule } from '@angular/router';
import { NotFound404Component } from './not-found404/not-found404.component';
import { IndexComponent } from './home/index/index.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: IndexComponent },
  {
    path: '**',
    component: NotFound404Component
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
