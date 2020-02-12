import { ValidatorFn, AbstractControl } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string, errorMessage: string): ValidatorFn {
  return (group: AbstractControl) => {
    const baseControl = group.get(controlName);
    const matchingControl = group.get(matchingControlName);

    if (!baseControl || !matchingControl) {
      return null;
    }

    if (matchingControl.errors && !matchingControl.errors[errorMessage]) {
      // return if another validator has already found an error on the matchingControl
      return null;
    }

    // set error on matchingControl if validation fails
    if (baseControl.value !== matchingControl.value) {
      const error = {};
      Object.defineProperty(error, errorMessage, { value: true, enumerable: true });
      matchingControl.setErrors(error);
      return error;
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  };
}
