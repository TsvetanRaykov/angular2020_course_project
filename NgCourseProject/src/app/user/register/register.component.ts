import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '../../shared/must-match.validator';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalMessages } from '../../shared/global.constants';
import { environment } from 'src/environments/environment';
import { IUser, ILocation } from '../../models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../shared/form.validation.styles.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  location: ILocation;
  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router) {
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

  onSubmit() {
    const aUser: IUser = {
      username: this.user('email'),
      password: this.user('password'),
      fullName: `${this.user('firstname')} ${this.user('lastname')}`,
      phone: this.user('phone'),
      address: this.location.address.slice(),
      location: this.location
    };
    this.authService.signUp(aUser).subscribe({
      next: () => {
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
        if (error.code === 202 && error.message.includes('exists')) {
          this.toastr.error(GlobalMessages.REGISTRATION_EXISTS);
        } else {
          this.toastr.error(GlobalMessages.REGISTRATION_FAILED);
        }
        if (!environment.production) {
          console.error(error);
        }
      },
      complete: () => {
        if (!environment.production) {
          console.log('Registraton complete');
        }
      }
    });
  }
  private user(key: string) {
    return this.registerForm.get(key).value;
  }
}
