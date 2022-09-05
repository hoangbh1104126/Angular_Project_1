import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { NoWhitespaceValidator } from "../validators/no-whitespace.validator";
import { checkPassStrong } from "../validators/pass-without-username.validator";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.scss"]
})
export class LogInComponent implements OnInit {
  // signInForm = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  //   rememberMe: new FormControl(false),
  // });
  hide = true;
  signInForm !: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      username: [
        "",
        Validators.compose([
          Validators.required,
          NoWhitespaceValidator(),
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern(/^[A-Za-z0-9_\.]/),
        ])
      ],
      password: [
        "",
        Validators.compose([
          Validators.required,
          NoWhitespaceValidator(),
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]/),
        ])
      ],
      rememberMe: false,
    },
    {
      //validators: checkPassStrong("username", "password"),
    });

    new FormControl("", Validators.required, this.isUserNameDuplicated);
  }


  onSubmit(): void {
    console.log(this.signInForm);
  }

  isUserNameDuplicated(control: AbstractControl): Observable<ValidationErrors> {
    return of({});
  }

  comeback(){
    alert("Success! \nReturn to data user page ...");
    window.location.href="account_management";
  }


  getErrorMessage(attribute : any) : string{
    if(this.signInForm.get(attribute)?.hasError('required')){
      return "You must enter a value!";
    }
    if(this.signInForm.get(attribute)?.hasError('pattern') && !this.signInForm.get(attribute)?.hasError('required')){
      return "Incorrect input type!";
    }
    if(!this.signInForm.get(attribute)?.hasError('minlength') && !this.signInForm.get(attribute)?.hasError('required')){
      return attribute as string + " can be max 20 characters";
    }
    if(!this.signInForm.get(attribute)?.hasError('maxlength') && !this.signInForm.get(attribute)?.hasError('required')){
      return attribute as string + " must be at least 6 characters";
    }
    
    return "Unknown error!";
  }
}
