import { Injectable } from '@angular/core';
import { Parse } from 'parse';
import { environment } from '../../../environments/environment';
import { IUser, IAuthService } from '../../models';
import { from, Observable } from 'rxjs';
import { debounceTime, delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
class AuthService implements IAuthService {
  get User(): IUser | undefined {
    const currentUser = Parse.User.current();
    return !!currentUser ? JSON.parse(JSON.stringify(currentUser)) : undefined;
  }

  get isLogged() {
    return !!this.User;
  }

  get isAdmin() {
    return this.isLogged && this.User.userRole === 'staff';
  }

  constructor() {
    Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
    Parse.serverURL = environment.serverURL;
    Parse.User.enableUnsafeCurrentUser();
  }

  signUp(user: IUser): Observable<any> {
    delete user.location.address;
    const location = new Parse.GeoPoint(user.location);
    const newUser = new Parse.User();
    newUser.set('username', user.username);
    newUser.set('email', user.username);
    newUser.set('password', user.password);
    newUser.set('address', user.address);
    newUser.set('fullName', user.fullName);
    newUser.set('phone', user.phone);
    newUser.set('location', location);
    newUser.set('role', user.userRole);

    return from(newUser.signUp());
  }

  logIn(username: string, password: string): Observable<any> {
    Parse.User.enableUnsafeCurrentUser();
    return from(Parse.User.logIn(username, password)).pipe(debounceTime(500));
  }

  logOut(): Observable<any> {
    Parse.User.enableUnsafeCurrentUser();
    return from(Parse.User.logOut()).pipe(debounceTime(500), delay(2000));
  }

  update(changes: {}): Observable<any> {
    const user = Parse.User.current();
    Object.keys(changes).forEach(k => {
      if (k === 'location') {
        const location = new Parse.GeoPoint(changes[k]);
        user.set(k, location);
      } else {
        user.set(k, changes[k]);
      }
    });

    return from(user.save());
  }
}
