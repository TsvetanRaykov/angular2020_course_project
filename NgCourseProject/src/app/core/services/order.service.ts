import { Injectable } from '@angular/core';
import { IPizzaOrder } from 'src/app/models/IPizzaOrder';
import { Observable, from } from 'rxjs';
import { Parse } from 'parse';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor() {
    Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
    Parse.serverURL = environment.serverURL;
  }

  makeOrder(order: IPizzaOrder): Observable<any> {
    const Order = Parse.Object.extend('Order');
    const User = Parse.Object.extend('User');
    const Pizza = Parse.Object.extend('Pizza');

    const { pizza, user, quantity } = order;
    const { weight, price, size } = order.type;

    const newOrder = new Order();
    newOrder.set('pizza', new Pizza(pizza));
    newOrder.set('user', new User(user));
    newOrder.set('quantity', quantity);
    newOrder.set('weight', weight);
    newOrder.set('price', price);
    newOrder.set('size', size);
    newOrder.set('status', 'new');
    return from(newOrder.save());
  }

  getOrders(user?: IUser, status?: 'new' | 'processing' | 'dispatched'): Observable<any> {
    const Order = Parse.Object.extend('Order');
    const User = Parse.Object.extend('User');
    const orderQuery = new Parse.Query(Order);
    if (user) {
      orderQuery.equalTo('user', new User(user));
    }
    if (status) {
      orderQuery.equalTo('status', status);
    }
    orderQuery.descending('updatedAt');
    return from(orderQuery.find());
  }

  listenOrders() {
    const client = new Parse.LiveQueryClient({
      applicationId: environment.PARSE_APP_ID,
      serverURL: environment.liveServerUrl,
      javascriptKey: environment.PARSE_JS_KEY,
      masterKey: environment.PARSE_MASTER_KEY
    });
    client.open();

    const Order = Parse.Object.extend('Order');
    const query = new Parse.Query(Order);
    query.descendig('createdAt');
    const subscription = client.subscribe(query);
    subscription.on('enter', object => {
      console.log('object entered', object);
    });
    subscription.on('update', order => {
      console.log('object entered', order);
    });
    subscription.on('create', order => {
      console.log('object created', order);
    });
  }
}
