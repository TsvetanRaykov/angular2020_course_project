import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IOrdersSortResult } from 'src/app/models';
import { Observable } from 'rxjs';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersListResolver implements Resolve<IOrdersSortResult> {
  constructor(private ordersService: OrderService, private userService: AuthService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IOrdersSortResult | Observable<IOrdersSortResult> | Promise<IOrdersSortResult> {
    if (this.userService.isAdmin) {
      return this.ordersService.getOrders(null, 'new');
    }
    return this.ordersService.getOrders(this.userService.User);
  }
}
