import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validators } from '@angular/forms';

@Directive({
  selector: '[min]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinValueDirective, multi: true }],
})
export class MinValueDirective {

  @Input() min: number;

  validate(control: AbstractControl): { [key: string]: any } {
    return Validators.min(this.min)(control);
  }

}
