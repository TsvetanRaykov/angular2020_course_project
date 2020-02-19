import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderService } from '../core/services/order.service';
import { AuthService } from '../core/services/auth.service';

@NgModule({
  declarations: [OrderListComponent],
  imports: [CommonModule, OrderRoutingModule]
})
export class OrderModule {
  constructor(private orderService: OrderService, private userService: AuthService) {
    // orderService.getOrdersByStatus().subscribe({
    //   next: orders => {
    //     console.log(JSON.stringify(orders));
    //   }
    // });
    // orderService.getOrders(this.userService.User, 'new').subscribe({
    //   next: orders => {
    //     console.log(JSON.stringify(orders));
    //   }
    // });
    orderService.listenOrders();
  }
}
