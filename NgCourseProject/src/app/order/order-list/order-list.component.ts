import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnDestroy {
  get isAdmin() {
    return this.userService.isAdmin;
  }
  constructor(private orderService: OrderService, private userService: AuthService) {
    if (this.isAdmin) {
      this.subscriptions.push(this.orderService.listenOrders().subscribe(console.log));
    }
  }
  subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
