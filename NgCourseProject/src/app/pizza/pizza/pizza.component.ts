import { Component, OnInit, Input } from '@angular/core';
import { IPizza, IPizzaType } from 'src/app/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PizzaOrderComponent } from '../pizza-order/pizza-order.component';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
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
  constructor(private modalService: NgbModal) {}
  @Input()
  pizza: IPizza;
  pizzaUnknownPhoto = '../../../assets/default-placeholder-250x250.png';

  ngOnInit() {}
  handleOrder(type: IPizzaType, pizza: IPizza) {
    console.log(type, pizza);
    const modalRef = this.modalService.open(PizzaOrderComponent, { centered: true, backdrop: 'static' });
    const order = { ...pizza, types: [type] };
    modalRef.componentInstance.order = order;
    modalRef.result.then(
      a => {
        console.log(a);
      },
      b => {
        console.log(b);
      }
    );
  }
}
