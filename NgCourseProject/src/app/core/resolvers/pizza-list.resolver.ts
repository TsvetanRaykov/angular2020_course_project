import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IPizza } from 'src/app/models';
import { Observable } from 'rxjs';
import { PizzaService } from '../services/pizza.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaListResolver implements Resolve<IPizza[]> {
  constructor(private pizzaService: PizzaService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IPizza[] | Observable<IPizza[]> | Promise<IPizza[]> {
    return this.pizzaService.getAll();
  }
}
