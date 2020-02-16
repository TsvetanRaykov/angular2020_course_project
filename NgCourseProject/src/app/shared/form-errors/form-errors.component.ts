import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent implements OnInit {
  @Input()
  formGrp: FormGroup;

  get errors() {
    const listErrors = [];
    Object.keys(this.formGrp.controls).forEach(k => {
      const ctrl = this.formGrp.controls[k] as FormControl;
      if ((ctrl.touched || ctrl.dirty) && ctrl.errors) {
        Object.keys(ctrl.errors).forEach(validator => {
          const name = this.formatName(k);
          switch (validator) {
            case 'email':
              listErrors.push(`${name} is invalid`);
              break;
            case 'required':
              listErrors.push(`${name} is required`);
              break;
            case 'minlength':
              listErrors.push(`${name} must be at least ${ctrl.errors.minlength.requiredLength} characters`);
              break;
            default:
              listErrors.push(this.formatName(validator));
              break;
          }
        });
      }
    });
    return listErrors;
  }
  constructor() {}

  ngOnInit() {}

  private formatName(name: string) {
    const uppers = name.match(/[A-Z]/g);
    let tmp = name.slice().toLocaleLowerCase();
    const result = uppers
      ? uppers
          .map(u => name.indexOf(u))
          .filter(i => i > 0)
          .map(i => {
            const word = tmp.substring(0, i);
            tmp = tmp.slice(i);
            return word;
          })
          .concat([tmp])
          .join(' ')
      : tmp;

    return result.charAt(0).toLocaleUpperCase() + result.slice(1);
  }
}
