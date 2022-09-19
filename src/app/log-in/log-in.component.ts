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
import { User } from "../user";
import { AdminAccount, UserAccount } from "../user-account";
import { NoWhitespaceValidator } from "../validators/no-whitespace.validator";
import usersData from 'src/accounts.json';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from "@angular/router";

let users : User[] = usersData;
let userAccount : UserAccount[] = [];

for(var user of users){
  userAccount.push(
    {
      id: user.account_number,
      username : user.firstname + user.lastname,
      password : user.lastname + user.firstname + "@123",
      role : "User",
    }
  )
}

let adminAccount : AdminAccount[] = [
  {
    id: -1,
    username : "admin123",
    password : "nimda@123",
    role : "Admin",
  }
];

userAccount = userAccount.concat(adminAccount);

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.scss"]
})
export class LogInComponent implements OnInit {
  check: boolean = true;
  userAccount = userAccount;
  hide = true;
  logInForm !: FormGroup;
  role : string;

  userLogged!: string;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public router: Router,
  ) {
    this.role = "Guest";
  }

  ngOnInit(): void {
    this.logInForm = this.fb.group({
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
          Validators.pattern(/^(?=.*[!@#$%^&*]+)[A-Za-z0-9!@#$%^&*]/),
        ])
      ],
      rememberMe: false,
    },
    {
      validators: this.checkPassword("username", "password"),
    });

    new FormControl("", Validators.required, this.isUserNameDuplicated);
  }

  isUserNameDuplicated(control: AbstractControl): Observable<ValidationErrors> {
    return of({});
  }

  comeback(){
    let check = true;
    if(this.checkCorrect(this.logInForm.get('username')?.value, this.logInForm.get('password')?.value)){
      this._snackBar.open("Success! \nYou are login as " + this.logInForm.get('username')?.value +" = " + this.role, "Return", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 1250,
      });
      setTimeout(() => {
        this.router.navigateByUrl('/loading', {
          state: { user: this.userLogged }
        });
      }, 500);

    } else {
      this._snackBar.open("Cannot find account in database!", "Try again", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 3000,
      });
    }
  }

  getErrorMessage(attribute : any) : string{
    if(this.logInForm.get(attribute)?.hasError('required')){
      return "You must enter a value!";
    }
    if(this.logInForm.get(attribute)?.hasError('pattern') && !this.logInForm.get(attribute)?.hasError('required')){
      return "Incorrect input type!";
    }
    if(!this.logInForm.get(attribute)?.hasError('minlength') && !this.logInForm.get(attribute)?.hasError('required')){
      return attribute as string + " can be max 20 characters";
    }
    if(!this.logInForm.get(attribute)?.hasError('maxlength') && !this.logInForm.get(attribute)?.hasError('required')){
      return attribute as string + " must be at least 6 characters";
    }
    return "Unknown error!";
  }

  checkPassword = (username: string, password: string) => {
    return function(formGroup: FormGroup) {
      const { value: usernameValue } = formGroup.get(username) as AbstractControl;
      const { value: passwordValue } = formGroup.get(password) as AbstractControl;
      if(passwordValue == "" || usernameValue == "" || passwordValue == null || usernameValue == null) return null;
      return passwordValue.includes(usernameValue) ? { valueNotMatch: { usernameValue, passwordValue } } : null;
    };
  };

  checkCorrect(username: string, password: string){
    return userAccount.some(element => {
      if(element.username == username && element.password == password){
        this.role = element.role;
        this.userLogged = element.id.toString();
        return true;
      } return false;
    });
  }
}
