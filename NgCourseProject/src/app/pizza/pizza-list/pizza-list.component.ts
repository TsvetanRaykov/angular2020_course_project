import { Component, OnInit } from '@angular/core';
import { IPizza } from 'src/app/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss']
})
export class PizzaListComponent implements OnInit {
  pizzas: IPizza[];
  constructor(private activatedRoute: ActivatedRoute) {
    this.pizzas = activatedRoute.snapshot.data[0];
  }

  ngOnInit() {}
}
