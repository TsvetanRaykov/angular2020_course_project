import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbdSortableHeaderDirective, SortEvent } from './sortable.directive';
import { Observable, Subscription } from 'rxjs';
import { IPizzaOrder } from 'src/app/models/IPizzaOrder';
import { KinveyUserAuthService } from 'src/app/core/services/kinvey-user-auth.service';
import { KinveyOrderService } from 'src/app/core/services/kinvey-order.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {
  get isAdmin() {
    return this.userService.isAdmin;
  }
  subscriptions: Subscription[] = [];
  constructor(public service: KinveyOrderService, private userService: KinveyUserAuthService) {
    // const { results, count } = this.activatedRoute.snapshot.data[0];
    this.orders$ = service.orders$;
    this.total$ = service.total$;
  }

  orders$: Observable<IPizzaOrder[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;
  ngOnInit(): void {}

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.column !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  handleSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.column !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  handleOrderStatusChange(order: IPizzaOrder, status: string) {
    console.log(status);
    this.service.updateOrder({ ...order, status }).subscribe();
  }
}
