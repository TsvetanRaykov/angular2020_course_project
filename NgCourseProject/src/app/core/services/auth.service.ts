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
  constructor() {
    Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
    Parse.serverURL = environment.serverURL;
    Parse.User.enableUnsafeCurrentUser();
  }

  signUp(user: IUser): Observable<any> {
    const newUser = new Parse.User();
    newUser.set('username', user.username);
    newUser.set('password', user.password);
    return from(newUser.signUp());
  }

  logIn(user: IUser): Observable<any> {
    return from(Parse.User.logIn(user.username, user.password)).pipe(debounceTime(1000));
  }

  logOut(): Observable<any> {
    return from(Parse.User.logOut()).pipe(debounceTime(1000));
  }
}
