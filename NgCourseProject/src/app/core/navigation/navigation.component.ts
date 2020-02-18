import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../models';
import { Subscription } from 'rxjs';
import { GlobalMessages } from 'src/app/shared/global.constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnDestroy {
  collapsed = true;
  logoutSub: Subscription;
  get User(): IUser {
    return this.authService.User;
  }
  get isLogged() {
    return this.authService.isLogged;
  }
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}
  logout() {
    this.logoutSub = this.authService.logOut().subscribe(() => {
      this.toastr.success(GlobalMessages.LOGOUT_SUCCESS);
      this.router.navigate(['/']);
    });
  }
  ngOnDestroy() {
    this.logoutSub.unsubscribe();
  }
}
