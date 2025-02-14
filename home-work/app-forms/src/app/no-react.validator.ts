import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[noReactValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NoReactValidator,
      multi: true
    }
  ]
})
export class NoReactValidator implements Validator{
  registerOnValidatorChange(fn: () => void): void {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value.toLowerCase() === 'react'
      ? {noReactValidator: {message: 'React is not allowed'}}
      : null;
  }
}
