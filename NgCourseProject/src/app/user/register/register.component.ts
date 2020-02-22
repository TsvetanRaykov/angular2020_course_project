import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '../../shared/must-match.validator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalMessages } from '../../shared/global.constants';
import { environment } from 'src/environments/environment';
import { IUser, ILocation } from '../../models';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { KinveyUserAuthService } from 'src/app/core/services/kinvey-user-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../shared/form.validation.styles.scss']
})
export class RegisterComponent implements OnDestroy {
  registerForm: FormGroup;
  location: ILocation;
  subscribes: Subscription[] = [];
  constructor(
    private fb: FormBuilder,
    private authService: KinveyUserAuthService,
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
    this.subscribes.forEach(s => s.unsubscribe());
  }
  onSubmit() {
    this.spinner.show();
    const aUser: IUser = {
      username: this.user('email'),
      email: this.user('email'),
      password: this.user('password'),
      fullName: `${this.user('firstname') || ''} ${this.user('lastname') || ''}`,
      phone: this.user('phone'),
      address: this.location.address.slice(),
      location: this.location,
      userRole: 'user',
      _id: null
    };
    this.subscribes.push(
      this.authService.signUp(aUser).subscribe({
        next: () => {
          this.spinner.hide();
          this.toastr.success(GlobalMessages.REGISTRATION_SUCCESS);
          this.router.navigateByUrl('/');
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
      })
    );
  }
  private user(key: string) {
    return this.registerForm.get(key).value;
  }
}
