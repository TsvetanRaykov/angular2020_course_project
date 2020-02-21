import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IPizza, IPizzaType } from 'src/app/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PizzaOrderComponent } from '../pizza-order/pizza-order.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPizzaOrder } from 'src/app/models/IPizzaOrder';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalMessages } from 'src/app/shared/global.constants';
import { environment } from 'src/environments/environment';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnDestroy {
  @Input()
  pizza: IPizza;
  pizzaUnknownPhoto = '../../../assets/default-placeholder-250x250.png';
  subscribes: Subscription[] = [];
  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  get isLogged() {
    return this.authService.isLogged;
  }
  get isAdmin() {
    return this.authService.isAdmin;
  }
  get types() {
    return this.pizza ? this.pizza.types : [];
  }

  get photoSrc() {
    return this.pizza && this.pizza.photo ? this.pizza.photo.url || this.pizza.photo.base64 : this.pizzaUnknownPhoto;
  }

  get name() {
    return this.pizza ? this.pizza.name : null;
  }
  get description() {
    return this.pizza ? this.pizza.description : null;
  }

  ngOnDestroy() {
    this.spinner.hide();
    this.subscribes.forEach(s => s.unsubscribe());
  }
  handleOrder(type: IPizzaType, pizza: IPizza) {
    if (this.isAdmin) {
      return;
    }
    if (!this.isLogged) {
      this.router.navigate(['/user/login']);
      return;
    }
    const modalRef = this.modalService.open(PizzaOrderComponent, { centered: true, backdrop: 'static' });
    const order = { ...pizza, types: [type], quantity: 1 };
    modalRef.componentInstance.order = order;
    modalRef.result.then(
      qty => {
        this.spinner.show();
        const newOrder: IPizzaOrder = {
          pizza,
          type,
          quantity: qty,
          user: this.authService.User,
          status: 'new'
        };
        this.subscribes.push(
          this.orderService.makeOrder(newOrder).subscribe({
            next: () => {
              this.spinner.hide();
              this.toastr.success(GlobalMessages.ORDER_SUBMITTED);
            },
            error: error => {
              this.spinner.hide();
              this.toastr.error(GlobalMessages.ORDER_FALIED);
              if (!environment.production) {
                console.error(error);
              }
            }
          })
        );
      },
      b => {
        // cancel
        // console.log(b);
      }
    );
  }
}
