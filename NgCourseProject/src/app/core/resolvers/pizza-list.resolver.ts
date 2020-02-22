import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IPizza } from 'src/app/models';
import { Observable } from 'rxjs';
import { KinveyPizzaService } from '../services/kinvey-pizza.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaListResolver implements Resolve<IPizza[]> {
  constructor(private pizzaService: KinveyPizzaService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IPizza[] | Observable<IPizza[]> | Promise<IPizza[]> {
    return this.pizzaService.getAll();
  }
}
