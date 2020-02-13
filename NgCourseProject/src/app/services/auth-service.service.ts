import { Injectable } from '@angular/core';
import { Parse } from 'parse';
import { IUser } from '../models/user.model';
import { environment } from '../../environments/environment';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
    Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
    Parse.serverURL = environment.serverURL;
  }
  registerUser(user: IUser) {
    const newUser = new Parse.User();
    newUser.set('username', user.username);
    newUser.set('password', user.password);
    return from(newUser.save());
  }
}
