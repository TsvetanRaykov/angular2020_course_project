import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '../../shared/must-match.validator';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService) {}
  registerForm: FormGroup;
  get email() {
    return this.registerForm.get('email').value;
  }
  get password() {
    return this.registerForm.get('password').value;
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(3)]),
        RepeatPassword: new FormControl('')
      },
      { validators: [MustMatch('password', 'RepeatPassword', 'Passwords do not match!')] }
    );
  }

  onSubmit() {
    this.authService
      .registerUser({
        username: this.email,
        password: this.password,
        email: this.email
      })
      .subscribe({
        next: data => console.log(data),
        error: error => console.error(error),
        complete: () => console.log('Request complete')
      });
  }
}
