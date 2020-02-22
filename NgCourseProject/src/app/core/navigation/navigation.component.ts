import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../models';
import { Subscription } from 'rxjs';
import { GlobalMessages } from 'src/app/shared/global.constants';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { KinveyUserAuthService } from '../services/kinvey-user-auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnDestroy {
  collapsed = true;
  subsribes: Subscription[] = [];
  get User(): IUser {
    return this.authService.User;
  }
  get isLogged() {
    return this.authService.isLogged;
  }
  get isAdmin() {
    return this.authService.isAdmin;
  }

  constructor(
    private authService: KinveyUserAuthService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  logout() {
    this.spinner.show();
    this.subsribes.push(
      this.authService.logOut().subscribe(
        () => {
          this.spinner.hide();
          this.toastr.success(GlobalMessages.LOGOUT_SUCCESS);
          this.router.navigate(['/']);
        },
        error => {
          this.spinner.hide();
          if (!environment.production) {
            console.error(error);
          }
        }
      )
    );
  }
  ngOnDestroy() {
    this.subsribes.forEach(s => s.unsubscribe());
    this.spinner.hide();
  }
}
