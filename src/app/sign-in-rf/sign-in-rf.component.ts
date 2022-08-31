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

@Component({
  selector: "app-sign-in-rf",
  templateUrl: "./sign-in-rf.component.html",
  styleUrls: ["./sign-in-rf.component.scss"]
})
export class SignInRfComponent implements OnInit {
  // signInForm = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  //   rememberMe: new FormControl(false),
  // });

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
          Validators.pattern(/^[A-Za-z0-9_\.]{6,32}$/)
        ])
      ],
      password: [
        "",
        Validators.compose([
          Validators.required,
          NoWhitespaceValidator(),
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern(/^([A-Z]){1}([\w_\.!@#$%^&*()]+){5,31}$/)
        ])
      ],
      rememberMe: false
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
}
