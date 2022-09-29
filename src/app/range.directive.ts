
import { Directive, Input, forwardRef } from "@angular/core";
import {
	Validator, AbstractControl, NG_VALIDATORS, Validators, ValidatorFn
} from "@angular/forms";

@Directive({
  selector: "[min][formControlName],[min][formControl]", //[min][ngModel]
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MinDirective,
      multi: true
    }
  ]
})
export class MinDirective implements Validator {
  private _validator!: ValidatorFn;
  @Input() public set min(value: string) {
    this._validator = Validators.min(parseInt(value, 10));
  }

  public validate(control: AbstractControl): { [key: string]: any } {
    return this._validator(control)!;
  }
}

@Directive({
  selector: "[max][formControlName],[max][formControl]", //[max][ngModel]
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MaxDirective,
      multi: true
    }
  ]
})
export class MaxDirective implements Validator {
  private _validator!: ValidatorFn;
  @Input() public set max(value: string) {
      this._validator = Validators.max(parseInt(value, 10));
  }

  public validate(control: AbstractControl): { [key: string]: any } {
      return this._validator(control)!;
  }
}
