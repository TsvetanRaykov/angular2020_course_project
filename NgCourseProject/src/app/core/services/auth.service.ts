import { Injectable } from '@angular/core';
import { Parse } from 'parse';
import { environment } from '../../../environments/environment';
import { IUser, IAuthService } from '../../models';
import { from, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {
  get User(): IUser | undefined {
    const currentUser = Parse.User.current();
    return !!currentUser ? JSON.parse(JSON.stringify(currentUser)) : undefined;
  }

  get isLogged() {
    return !!this.User;
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
    newUser.set('role', 'user');

    return from(newUser.signUp());
  }

  logIn(username: string, password: string): Observable<any> {
    return from(Parse.User.logIn(username, password)).pipe(debounceTime(1000));
  }

  logOut(): Observable<any> {
    return from(Parse.User.logOut()).pipe(debounceTime(1000));
  }
}
