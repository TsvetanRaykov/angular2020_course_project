import { Component, OnInit, Input } from '@angular/core';
import { IPizza } from 'src/app/models';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  @Input()
  pizza: IPizza;

  get photoSrc() {
    return this.pizza && this.pizza.photo
      ? this.pizza.photo.url || this.pizza.photo.base64
      : '../../../assets/default-placeholder-250x250.png';
  }

  get name() {
    return this.pizza ? this.pizza.name : null;
  }
  get description() {
    return this.pizza ? this.pizza.description : null;
  }
  constructor() {}

  ngOnInit() {}
}
