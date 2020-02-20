// tslint:disable: adjacent-overload-signatures
// tslint:disable: variable-name
import { Injectable } from '@angular/core';
import { IPizzaOrder } from 'src/app/models/IPizzaOrder';
import { Observable, from, Subscription, BehaviorSubject, of, Subject } from 'rxjs';
import { Parse } from 'parse';
import { environment } from 'src/environments/environment';
import { IUser, IOrderServiceState, TSortDirection, IOrdersSortResult } from 'src/app/models';
import { map, tap, debounceTime, switchMap, delay } from 'rxjs/operators';

interface IParseResult {
  results: [];
  total: number;
}
type TStatus = 'new' | 'processing' | 'dispatched';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  liveQuerryClient: any;
  subscription: any;
  private _state: IOrderServiceState = {
    page: 1,
    pageSize: 4,
    sortColumn: '',
    sortDirection: ''
  };

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _sort$ = new Subject<void>();
  private _orders$ = new BehaviorSubject<IPizzaOrder[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  toSortResult = (parseObject: IParseResult): IOrdersSortResult => {
    const { results, count } = JSON.parse(JSON.stringify(parseObject));
    return { orders: results, total: count };
  };
  constructor() {
    Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
    Parse.serverURL = environment.serverURL;
    this._sort$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this.getOrders()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe(result => {
        this._orders$.next(result.orders);
        this._total$.next(result.total);
      });

    this._sort$.next();
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

  getOrders(user?: IUser, status?: TStatus): Observable<IOrdersSortResult> {
    const Order = Parse.Object.extend('Order');
    const User = Parse.Object.extend('User');
    const orderQuery = new Parse.Query(Order);
    orderQuery.include('pizza');
    orderQuery.include('user');
    orderQuery.withCount();
    if (user) {
      orderQuery.equalTo('user', new User(user));
    }
    if (status) {
      orderQuery.equalTo('status', status);
    }

    const { sortColumn, sortDirection, pageSize, page } = this._state;

    orderQuery.skip((page - 1) * pageSize);
    orderQuery.limit((page - 1) * pageSize + pageSize);

    if (sortDirection === 'asc') {
      orderQuery.ascending(sortColumn || 'createdAt');
    } else if (sortDirection === 'desc') {
      orderQuery.descending(sortColumn || 'createdAt');
    } else {
      orderQuery.descending('createdAt');
    }
    return from(orderQuery.find()).pipe(map(this.toSortResult));
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
    this.liveQuerryClient = new Parse.LiveQueryClient({
      applicationId: environment.PARSE_APP_ID,
      serverURL: environment.liveServerUrl,
      javascriptKey: environment.PARSE_JS_KEY,
      masterKey: environment.PARSE_MASTER_KEY
    });
    const Order = Parse.Object.extend('Order');
    const query = new Parse.Query(Order);
    query.descending('createdAt');
    this.liveQuerryClient.open();
    this.subscription = this.liveQuerryClient.subscribe(query);
  }

  get orders$() {
    return this._orders$.asObservable();
  }

  get total$() {
    return this._total$.asObservable().pipe();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }

  set page(page: number) {
    this._set({ page });
  }

  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }

  set sortColumn(sortColumn: string) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: TSortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<IOrderServiceState>) {
    Object.assign(this._state, patch);
    this._sort$.next();
  }
}
