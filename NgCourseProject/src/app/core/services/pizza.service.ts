import { Injectable } from '@angular/core';
import { IPizzaService, IPizza } from 'src/app/models';
import { Parse } from 'parse';
import { environment } from 'src/environments/environment';
import { Observable, Subject, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PizzaService implements IPizzaService {
  create(pizza: IPizza): Observable<any> {
    const Pizza = Parse.Object.extend('Pizza');
    const pizzaPhoto = new Parse.File(pizza.photo.photoName, { base64: pizza.photo.base64 });
    const { types } = pizza;
    delete pizza.types;
    const prepared = { ...pizza, photo: pizzaPhoto };
    const newPizza = new Pizza(prepared);
    const Type = Parse.Object.extend('Type');
    const promises = [];

    types.forEach(t => {
      const pizzaType = new Type(t);
      pizzaType.set('pizza', newPizza);
      promises.push(pizzaType.save());
    });

    return from(Promise.all(promises));
  }
  getAll(): Observable<any> {
    const Pizza = Parse.Object.extend('Pizza');
    const pizzaQuery = new Parse.Query(Pizza);

    const Type = Parse.Object.pizzaQuery.find().then(data => {
      console.log(data);
    });
    return from(pizzaQuery.find());
  }
  getOneById(id: string): IPizza {
    throw new Error('Method not implemented.');
  }
  update(pizza: IPizza): boolean {
    throw new Error('Method not implemented.');
  }
  constructor() {
    Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
    Parse.serverURL = environment.serverURL;
    Parse.User.enableUnsafeCurrentUser();
  }
}
