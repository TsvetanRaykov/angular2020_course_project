import { Injectable } from '@angular/core';
import { IPizzaOrder } from 'src/app/models/IPizzaOrder';
import { Observable, from, Subscription } from 'rxjs';
import { Parse } from 'parse';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  client;
  subscription;
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

  listenOrders(): Observable<IPizzaOrder> {
    this.initializaRealTimeClient();
    const observable = new Observable((observer: any) => {
      this.subscription.on('create', order => {
        observer.next(order);
      });
    });

    return observable.pipe(map(obj => JSON.parse(JSON.stringify(obj))));
  }

  private initializaRealTimeClient() {
    if (!!this.subscription) {
      return;
    }
    this.client = new Parse.LiveQueryClient({
      applicationId: environment.PARSE_APP_ID,
      serverURL: environment.liveServerUrl,
      javascriptKey: environment.PARSE_JS_KEY,
      masterKey: environment.PARSE_MASTER_KEY
    });
    const Order = Parse.Object.extend('Order');
    const query = new Parse.Query(Order);
    query.descending('createdAt');
    this.client.open();
    this.subscription = this.client.subscribe(query);
  }
}
