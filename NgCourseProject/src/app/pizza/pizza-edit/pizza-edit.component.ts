import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PizzaNewComponent } from '../pizza-new/pizza-new.component';
import { KinveyPizzaService } from 'src/app/core/services/kinvey-pizza.service';
import { ActivatedRoute } from '@angular/router';
import { IPizza } from 'src/app/models';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-pizza-edit',
  templateUrl: './pizza-edit.component.html',
  styleUrls: ['./pizza-edit.component.scss']
})
export class PizzaEditComponent implements OnInit {
  pizza: IPizza;
  constructor(private pizzaService: KinveyPizzaService, private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.pizzaService.getOneById(id).subscribe(data => (this.pizza = JSON.parse(JSON.stringify(data))));
  }
}
