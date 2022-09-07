import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { User } from "../user";
import { NoWhitespaceValidator } from "../validators/no-whitespace.validator";
import usersData from 'src/accounts.json';

let users : User[] = usersData;
let numberUser = Math.max(...users.map(o => o.account_number));

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  check: boolean = true;
  hide = true;
  signInForm !: FormGroup;
  role : string;
  onLog : boolean = true;
  numberUser = numberUser + 2;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddUserComponent>) {
    this.role = "Guest";
  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      balance: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]/),
        ])
      ],
      firstname: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(/^[A-Za-z0-9]/),
        ])
      ],
      lastname: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(/^[A-Za-z0-9]/),
        ])
      ],
      age: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]/),
        ])
      ],
      gender: [
        "",
        Validators.compose([
          Validators.pattern(/^[FM]/),
        ])
      ],
      address: [
        "",
        Validators.compose([
          Validators.maxLength(30),
          Validators.pattern(/^[A-Za-z0-9_\. ]/),
        ])
      ],
      employer: [
        "",
        Validators.compose([
          Validators.maxLength(20),
          Validators.pattern(/^[A-Za-z0-9_\.]/),
        ])
      ],
      email: [
        "",
        Validators.compose([
          Validators.maxLength(30),
          Validators.email,
        ])
      ],
      city: [
        "",
        Validators.compose([
          Validators.maxLength(20),
          Validators.pattern(/^[A-Za-z0-9_\. ]/),
        ])
      ],
      state: [
        "",
        Validators.compose([
          Validators.maxLength(20),
          Validators.pattern(/^[A-Za-z0-9_\. ]/),
        ])
      ],
    },
    );

    new FormControl("", Validators.required, this.isUserNameDuplicated);
  }


  onSubmit(): void {
    console.log(this.signInForm);
  }

  isUserNameDuplicated(control: AbstractControl): Observable<ValidationErrors> {
    return of({});
  }

  comeback(){
    
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
}
