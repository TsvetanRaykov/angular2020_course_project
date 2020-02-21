import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbdSortableHeaderDirective, SortEvent } from './sortable.directive';
import { Observable, Subscription } from 'rxjs';
import { OrderService } from 'src/app/core/services/order.service';
import { IPizzaOrder } from 'src/app/models/IPizzaOrder';
import { AuthService } from 'src/app/core/services/auth.service';

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
  constructor(public service: OrderService, private userService: AuthService) {
    // const { results, count } = this.activatedRoute.snapshot.data[0];
    this.total$ = service.total$;
    this.orders$ = service.orders$;
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
    this.service.updateOrder({ ...order, status }).subscribe(console.log);
  }
}
