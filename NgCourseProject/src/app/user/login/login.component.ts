import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalMessages } from 'src/app/shared/global.constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../shared/form.validation.styles.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  return: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
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
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => (this.return = params.return || '/'));
  }
  onSubmit() {
    this.authService.logIn(this.email, this.password).subscribe({
      next: () => {
        this.toastr.success(GlobalMessages.LOGIN_SUCCESS);
        this.router.navigateByUrl(this.return);
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
