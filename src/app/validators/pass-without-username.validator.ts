import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function checkPassStrong(username : AbstractControl) : ValidatorFn {
    return function (password : AbstractControl) : ValidationErrors | null{
      if(username.value.length==0 || password.value.length==0){
        return {};
      }
      return password.value.includes(username.value) ? { pass: "Username found in password!" } : {};
    };
  }