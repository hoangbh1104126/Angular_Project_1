import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  check: boolean = true;
  hide = true;
  addUserForm !: FormGroup;
  onLog : boolean = true;

  addUser !: User;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) { }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
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
          Validators.required,
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
      new: true,
    },
    );

    new FormControl("", Validators.required, this.isUserNameDuplicated);
  }

  isUserNameDuplicated(control: AbstractControl): Observable<ValidationErrors> {
    return of({});
  }

  comeback(){

  }

  change(){
    this.addUser = {
      "account_number": this.data.account_number,
      "balance": this.addUserForm.get('balance')?.value,
      "firstname": this.addUserForm.get('firstname')?.value,
      "lastname": this.addUserForm.get('lastname')?.value,
      "age": this.addUserForm.get('age')?.value,
      "gender": this.addUserForm.get('gender')?.value,
      "address": this.addUserForm.get('address')?.value == "" ? this.addUserForm.get('address')?.value : undefined,
      "employer": this.addUserForm.get('employer')?.value == "" ? this.addUserForm.get('address')?.value : undefined,
      "email": this.addUserForm.get('email')?.value == "" ? this.addUserForm.get('address')?.value : undefined,
      "city": this.addUserForm.get('city')?.value == "" ? this.addUserForm.get('address')?.value : undefined,
      "state": this.addUserForm.get('state')?.value == "" ? this.addUserForm.get('address')?.value : undefined,
      "new": this.addUserForm.get('new')?.value == "",
    };
    this.data = this.addUser;
  }

  getErrorMessage(attribute : any) : string{
    if(this.addUserForm.get(attribute)?.hasError('required')){
      return "You must enter a value!";
    }
    if(this.addUserForm.get(attribute)?.hasError('pattern') && !this.addUserForm.get(attribute)?.hasError('required')){
      return "Incorrect input type!";
    }
    if(!this.addUserForm.get(attribute)?.hasError('minlength') && !this.addUserForm.get(attribute)?.hasError('required')){
      return attribute as string + " can be max 20 characters";
    }
    if(!this.addUserForm.get(attribute)?.hasError('maxlength') && !this.addUserForm.get(attribute)?.hasError('required')){
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
