import { Component, OnInit } from '@angular/core';
import { PizzaService } from 'src/app/core/services/pizza.service';
import { IPizza } from 'src/app/models';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss']
})
export class PizzaListComponent implements OnInit {
  pizzas: IPizza[];
  constructor(private pizzaService: PizzaService) {}

  ngOnInit() {
    this.pizzaService.getAll().subscribe(data => {
      this.pizzas = data;
    });
  }
}
