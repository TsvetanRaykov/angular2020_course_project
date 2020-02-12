import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '../../shared/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  registerForm: FormGroup;
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
    console.log(this.registerForm.value);
  }
}
