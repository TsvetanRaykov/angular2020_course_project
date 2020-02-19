import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/services/auth.guard';
import { OrderListComponent } from './order-list/order-list.component';

const routes: Routes = [
  {
    path: 'order',
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/order/list' },
      { path: 'list', canActivate: [AuthGuard], component: OrderListComponent }
    ]
  }
];
export const OrderRoutingModule = RouterModule.forChild(routes);
