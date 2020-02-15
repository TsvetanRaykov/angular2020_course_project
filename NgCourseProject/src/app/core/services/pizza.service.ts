import { Injectable } from '@angular/core';
import { IPizzaService, IPizza } from 'src/app/models';
import { Parse } from 'parse';
import { environment } from 'src/environments/environment';
import { Observable, Subject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PizzaService implements IPizzaService {
  create(pizza: IPizza): Observable<any> {
    const Pizza = Parse.Object.extend('Pizza');
    const pizzaPhoto = new Parse.File(pizza.photo.name, { base64: pizza.photo.base64 });
    const prepared = { ...pizza, photo: pizzaPhoto };
    const newPizza = new Pizza();
    return from(newPizza.save(prepared));
  }
  getAll(): IPizza[] {
    throw new Error('Method not implemented.');
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
