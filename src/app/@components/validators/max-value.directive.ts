import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validators } from '@angular/forms';

@Directive({
  selector: '[max]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MaxValueDirective, multi: true }],

})
export class MaxValueDirective {

  @Input() max: number;

  validate(control: AbstractControl): { [key: string]: any } {
    return Validators.max(this.max)(control);
  }

}