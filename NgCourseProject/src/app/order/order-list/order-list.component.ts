import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { KinveyUserAuthService } from 'src/app/core/services/kinvey-user-auth.service';
import { KinveyOrderService } from 'src/app/core/services/kinvey-order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnDestroy {
  get isAdmin() {
    return this.userService.isAdmin;
  }
  constructor(private orderService: KinveyOrderService, private userService: KinveyUserAuthService) {
    if (this.isAdmin) {
      // this.subscriptions.push(this.orderService.listenOrders().subscribe(console.log));
    }
  }
  subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
