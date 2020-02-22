// tslint:disable: adjacent-overload-signatures
// tslint:disable: variable-name
import { Injectable, ɵɵresolveDocument } from '@angular/core';
import { KinveyUserAuthService } from './kinvey-user-auth.service';
import { Query } from 'kinvey-angular-sdk';
import { DataStoreService } from 'kinvey-angular-sdk';
import { IPizzaOrder, TSortDirection, IOrderServiceState, IOrdersSortResult } from 'src/app/models';
import { Observable, from, BehaviorSubject, Subject, of } from 'rxjs';
import { map, tap, debounceTime, switchMap, buffer, first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
interface IParseResult {
  results: [];
  total: number;
}

interface TKinveyOrderType {
  _id?: string;
  name: string;
  description: string;
  pizzaId: string;
  userId: string;
  size: string;
  _kmd?: { lmt: Date; ect: Date };
  weight: number;
  singlePrice: number;
  totalPrice: number;
  quantity: number;
  username: string;
  email: string;
  phone: string;
  status: string;
  location: {
    address?: string;
    latitude: number;
    longitude: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class KinveyOrderService {
  collection: any;
  constructor(private userService: KinveyUserAuthService, datastoreService: DataStoreService) {
    this.collection = datastoreService.collection('Order');
    this._sort$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this.getOrders()),
        tap(() => this._loading$.next(false))
      )
      .subscribe(result => {
        this._orders$.next(result);
      });
    this._sort$.next();
  }

  get orders$() {
    return this._orders$.asObservable();
  }

  get total$() {
    return this._total$.asObservable();
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

  get sortColumn() {
    return this._state.sortColumn;
  }

  get sortDirection() {
    return this._state.sortDirection;
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

  makeOrder(order: IPizzaOrder): Observable<any> {
    // console.log(order);
    const { name, description, _id } = order.pizza;
    const { size, weight, price } = order.type;
    // const { status, user, quantity } = order;
    const { fullName, location, email, phone } = order.user;

    const newOrder: TKinveyOrderType = {
      ...order,
      description,
      name,
      email,
      location,
      phone,
      pizzaId: _id,
      singlePrice: price,
      size,
      totalPrice: order.quantity * price,
      userId: order.user._id,
      username: fullName,
      weight
    };

    // console.log(newOrder);
    return from(this.collection.save(newOrder).then(() => this._sort$.next()));
  }

  toSortResult = (parseObject: IParseResult): IOrdersSortResult => {
    const { results, count } = JSON.parse(JSON.stringify(parseObject));
    return { orders: results, total: count };
    // tslint:disable-next-line: semicolon
  };

  updateOrder(order: IPizzaOrder): Observable<any> {
    return this.makeOrder(order);
  }

  getOrders(): Observable<IPizzaOrder[]> {
    const orderQuery = new Query();
    if (!this.userService.isAdmin) {
      const uid = this.userService.User.email;
      orderQuery.equalTo('email', uid);
    }

    const { sortColumn, sortDirection, pageSize, page } = this._state;

    // orderQuery.skip = (page - 1) * pageSize;
    // orderQuery.limit = (page - 1) * pageSize + pageSize;

    if (sortDirection === 'asc') {
      orderQuery.ascending(sortColumn || 'createdAt');
    } else if (sortDirection === 'desc') {
      orderQuery.descending(sortColumn || 'createdAt');
    } else {
      orderQuery.descending('createdAt');
    }

    return this.collection.find(orderQuery).pipe(
      map((x: TKinveyOrderType[]): IPizzaOrder[] => {
        return x.map(d => {
          return {
            _id: d._id,
            size: d.size,
            weight: d.weight,
            price: d.quantity * d.singlePrice,
            createdAt: d._kmd?.ect,
            pizza: { description: d.description, name: d.name, onSale: null, weight: d.weight, photo: null, types: [] },
            quantity: d.quantity,
            status: d.status,
            type: { price: d.singlePrice, size: d.size, weight: d.weight },
            user: {
              _id: d.userId,
              address: d.location?.address,
              location: { address: d.location?.address, latitude: d.location.latitude, longitude: d.location.longitude },
              email: d.email,
              phone: d.phone
            }
          };
        });
      })
    );
  }

  // listenOrders(): Observable<IPizzaOrder> {
  //   this.initializaRealTimeClient();
  //   const observable = new Observable((observer: any) => {
  //     this.subscription.on('create', order => {
  //       observer.next(order);
  //     });
  //   });

  //   return observable.pipe(map(obj => JSON.parse(JSON.stringify(obj))));
  // }

  // private initializaRealTimeClient() {
  //   if (!!this.subscription) {
  //     return;
  //   }
  //   this.liveQuerryClient = new Parse.LiveQueryClient({
  //     applicationId: environment.PARSE_APP_ID,
  //     serverURL: environment.liveServerUrl,
  //     javascriptKey: environment.PARSE_JS_KEY,
  //     masterKey: environment.PARSE_MASTER_KEY
  //   });
  //   const Order = Parse.Object.extend('Order');
  //   const query = new Parse.Query(Order);
  //   query.descending('createdAt');
  //   this.liveQuerryClient.open();
  //   this.subscription = this.liveQuerryClient.subscribe(query);
  // }

  private _set(patch: Partial<IOrderServiceState>) {
    Object.assign(this._state, patch);
    this._sort$.next();
  }
}
