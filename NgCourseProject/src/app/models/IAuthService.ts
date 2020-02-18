import { Observable } from 'rxjs';
import { IUser } from '.';

export interface IAuthService {
  User: IUser | undefined;
  signUp(user: IUser): Observable<any>;
  logIn(username: string, password: string): Observable<any>;
  logOut(): Observable<any>;
}
