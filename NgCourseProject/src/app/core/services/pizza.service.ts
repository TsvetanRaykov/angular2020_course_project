import { Injectable } from '@angular/core';
import { IPizzaService, IPizza } from 'src/app/models';
import { Parse } from 'parse';
import { environment } from 'src/environments/environment';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PizzaService implements IPizzaService {
  constructor() {
    Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
    Parse.serverURL = environment.serverURL;
  }
  create(pizza: IPizza): Observable<any> {
    const Pizza = Parse.Object.extend('Pizza');
    const pizzaPhoto = new Parse.File(pizza.photo.photoName, { base64: pizza.photo.base64 });
    const prepared = { ...pizza, photo: pizzaPhoto };
    const newPizza = new Pizza();
    return from(newPizza.save(prepared));
  }

  getAll(): Observable<IPizza[]> {
    const Pizza = Parse.Object.extend('Pizza');
    const pizzaQuery = new Parse.Query(Pizza);
    pizzaQuery.descending('updatedAt');
    return from(pizzaQuery.find()).pipe(map((p: any) => JSON.parse(JSON.stringify(p))));
  }

  getOneById(id: string): IPizza {
    throw new Error('Method not implemented.');
  }
  update(pizza: IPizza): boolean {
    throw new Error('Method not implemented.');
  }
}
