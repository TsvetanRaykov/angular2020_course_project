import { Component, OnInit } from '@angular/core';
import { IPizza } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';
import { KinveyUserAuthService } from 'src/app/core/services/kinvey-user-auth.service';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss']
})
export class PizzaListComponent implements OnInit {
  pizzas: IPizza[];
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private userSerevice: KinveyUserAuthService) {
    this.pizzas = this.activatedRoute.snapshot.data[0];
  }

  ngOnInit() {}

  handleClick(pizzaId: string) {
    if (this.userSerevice.isAdmin) {
      this.router.navigateByUrl(`/pizza/edit/${pizzaId}`);
    }
  }
}
