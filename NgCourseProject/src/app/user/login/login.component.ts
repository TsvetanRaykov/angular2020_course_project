import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalMessages } from 'src/app/shared/global.constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  get email() {
    return this.loginForm.get('email').value;
  }
  get password() {
    return this.loginForm.get('password').value;
  }
  onSubmit() {
    this.authService.logIn({ username: this.email, password: this.password }).subscribe({
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
  }
}
