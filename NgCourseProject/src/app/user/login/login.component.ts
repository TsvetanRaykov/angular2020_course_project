import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalMessages } from 'src/app/shared/global.constants';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { KinveyUserAuthService } from 'src/app/core/services/kinvey-user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../shared/form.validation.styles.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  return: string;
  subscribes: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: KinveyUserAuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
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
  ngOnDestroy() {
    this.spinner.hide();
    this.subscribes.forEach(s => s.unsubscribe());
  }
  onSubmit() {
    this.spinner.show();
    this.subscribes.push(
      this.authService.logIn(this.email, this.password).subscribe({
        next: () => {
          this.spinner.hide();
          this.toastr.success(GlobalMessages.LOGIN_SUCCESS);
          this.router.navigateByUrl(this.return);
        },
        error: error => {
          this.spinner.hide();
          this.toastr.error(GlobalMessages.LOGIN_FAILED);

          if (!environment.production) {
            console.error(error);
          }
        }
      })
    );
  }
}
