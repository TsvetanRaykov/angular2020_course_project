import { Routes, RouterModule } from '@angular/router';
import { NotFound404Component } from './not-found404/not-found404.component';
import { PizzaListComponent } from './pizza/pizza-list/pizza-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: PizzaListComponent },
  {
    path: '**',
    component: NotFound404Component
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
