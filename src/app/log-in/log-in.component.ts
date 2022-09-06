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


let users : User[] = usersData;
let userAccount : UserAccount[] = [];

for(var user of users){
  userAccount.push(
    {
      username : user.firstname + user.lastname,
      password : user.lastname + user.firstname + "@123",
      role : "User",
    }
  )
}

let adminAccount : AdminAccount[] = [
  {
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
  signInForm !: FormGroup;
  role : string;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.role = "Guest";
  }

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


  onSubmit(): void {
    console.log(this.signInForm);
  }

  isUserNameDuplicated(control: AbstractControl): Observable<ValidationErrors> {
    return of({});
  }

  comeback(){
    let check = true;
    if(this.checkCorrect(this.signInForm.get('username')?.value, this.signInForm.get('password')?.value)){
      this._snackBar.open("Success! \nYou are login as " + this.signInForm.get('username')?.value +" = " + this.role, "Return", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 3000,
      });
      setTimeout(() => {
        window.location.href="account_management";
      }, 3500);

    } else {
      this._snackBar.open("Cannot find account in database!", "Try again", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 3000,
      });
    }
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
        return true;
      } return false;
    });
  }
}
