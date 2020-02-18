import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '../../shared/must-match.validator';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalMessages } from '../../shared/global.constants';
import { environment } from 'src/environments/environment';
import { IUser, ILocation } from '../../models';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../shared/form.validation.styles.scss']
})
export class RegisterComponent implements OnDestroy {
  registerForm: FormGroup;
  location: ILocation;
  serviceSubscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.registerForm = this.fb.group(
      {
        email: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
        RepeatPassword: new FormControl(null),
        phone: new FormControl(null, [Validators.required]),
        firstname: new FormControl(null),
        lastname: new FormControl(null)
      },
      { validators: [MustMatch('password', 'RepeatPassword', GlobalMessages.PASSWORDS_NOT_MATCH)] }
    );
  }

  locationChanged(location: ILocation) {
    this.location = location;
  }

  ngOnDestroy() {
    this.spinner.hide();
    this.serviceSubscription.unsubscribe();
  }
  onSubmit() {
    this.spinner.show();
    const aUser: IUser = {
      username: this.user('email'),
      password: this.user('password'),
      fullName: `${this.user('firstname')} ${this.user('lastname')}`,
      phone: this.user('phone'),
      address: this.location.address.slice(),
      location: this.location
    };
    this.serviceSubscription = this.authService.signUp(aUser).subscribe({
      next: () => {
        this.spinner.hide();
        this.toastr.success(GlobalMessages.REGISTRATION_SUCCESS);
        this.authService.logIn(aUser.username, aUser.password).subscribe({
          next: () => {
            this.toastr.success(GlobalMessages.LOGIN_SUCCESS);
            this.router.navigate(['/']);
          },
          error: error => {
            this.toastr.error(GlobalMessages.LOGIN_FAILED);
            if (!environment.production) {
              console.error(error);
            }
          }
        });
      },
      error: error => {
        this.spinner.hide();
        if (error.code === 202 && error.message.includes('exists')) {
          this.toastr.error(GlobalMessages.REGISTRATION_EXISTS);
        } else {
          this.toastr.error(GlobalMessages.REGISTRATION_FAILED);
        }
        if (!environment.production) {
          console.error(error);
        }
      }
    });
  }
  private user(key: string) {
    return this.registerForm.get(key).value;
  }
}
