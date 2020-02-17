import { RouterModule, Routes } from '@angular/router';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { PizzaNewComponent } from './pizza-new/pizza-new.component';
import { PizzaEditComponent } from './pizza-edit/pizza-edit.component';
import { PizzaListResolver } from '../core/resolvers/pizza-list.resolver';

const routes: Routes = [
  {
    path: 'pizza',
    children: [
      { path: '', pathMatch: 'full', component: PizzaListComponent, resolve: [PizzaListResolver] },
      { path: 'new', component: PizzaNewComponent },
      { path: 'edit/:id', component: PizzaEditComponent }
    ]
  }
];
export const PizzaRoutingModule = RouterModule.forChild(routes);
