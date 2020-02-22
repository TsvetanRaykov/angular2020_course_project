import { Injectable } from '@angular/core';
import { UserService } from 'kinvey-angular-sdk';
import { IAuthService, IUser } from 'src/app/models';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class KinveyUserAuthService implements IAuthService {
  get User(): IUser {
    const currentUser = this.userService.getActiveUser();
    if (currentUser?.data) {
      return JSON.parse(JSON.stringify(currentUser.data));
    }
    return null;
  }
  get isLogged(): boolean {
    return !!this.User && this.User.userRole !== 'guest';
  }
  get isAdmin(): boolean {
    return this.isLogged && this.User.userRole === 'staff';
  }

  update(data: {}): Observable<any> {
    const current = this.userService.getActiveUser();
    if (current?.data) {
      const newData = { ...current.data, ...data };
      return from(this.userService.update(newData));
    }
  }

  signUp(user: IUser): Observable<any> {
    return from(this.userService.logout().then(async () => await this.userService.signup({ ...user, username: user.username })));
  }
  logIn(username: string, password: string): Observable<any> {
    return from(this.userService.logout().then(async () => await this.userService.login({ username, password })));
  }
  logOut(): Observable<any> {
    return from(
      this.userService
        .logout()
        .then(() => this.userService.login(environment.GUEST_USER))
        .then()
    );
  }
  constructor(private userService: UserService) {
    if (!this.User) {
      this.userService.login(environment.GUEST_USER);
    }
  }
}
