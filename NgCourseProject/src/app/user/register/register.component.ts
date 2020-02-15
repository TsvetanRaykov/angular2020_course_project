import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '../../shared/must-match.validator';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalMessages } from '../../shared/global.constants';
import { environment } from 'src/environments/environment';
import { IUser } from '../../models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router) {
    this.registerForm = this.fb.group(
      {
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(3)]),
        RepeatPassword: new FormControl('')
      },
      { validators: [MustMatch('password', 'RepeatPassword', GlobalMessages.PASSWORDS_NOT_MATCH)] }
    );
  }
  get email() {
    return this.registerForm.get('email').value;
  }
  get password() {
    return this.registerForm.get('password').value;
  }

  onSubmit() {
    const aUser: IUser = {
      username: this.email,
      password: this.password
    };
    this.authService.signUp(aUser).subscribe({
      next: () => {
        this.toastr.success(GlobalMessages.REGISTRATION_SUCCESS);
        this.authService.logIn(aUser).subscribe({
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
}
