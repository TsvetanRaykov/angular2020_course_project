import { Component, OnInit, Input } from '@angular/core';
import { IPizza, IPizzaType } from 'src/app/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PizzaOrderComponent } from '../pizza-order/pizza-order.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  @Input()
  pizza: IPizza;
  pizzaUnknownPhoto = '../../../assets/default-placeholder-250x250.png';
  constructor(private modalService: NgbModal, private authService: AuthService, private router: Router) {}
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

  ngOnInit() {}
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
      a => {
        console.log(order, a);
      },
      b => {
        console.log(b);
      }
    );
  }
}
