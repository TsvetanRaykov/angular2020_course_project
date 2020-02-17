import { Routes, RouterModule } from '@angular/router';
import { NotFound404Component } from './not-found404/not-found404.component';
import { PizzaListComponent } from './pizza/pizza-list/pizza-list.component';
import { PizzaListResolver } from './core/resolvers/pizza-list.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: PizzaListComponent, resolve: [PizzaListResolver] },
  {
    path: '**',
    component: NotFound404Component
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
