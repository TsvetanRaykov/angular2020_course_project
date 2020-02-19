import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IPizza } from 'src/app/models';

@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.scss']
})
export class PizzaOrderComponent {
  @Input() order: any;

  get type() {
    return this.order.types[0];
  }
  constructor(public modal: NgbActiveModal) {}
}
