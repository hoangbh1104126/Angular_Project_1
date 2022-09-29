import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
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

@Component({
  selector: 'app-add-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  check: boolean = true;
  hide = true;
  editUserForm !: FormGroup;
  onLog : boolean = true;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User ,
  ) { }

  editUser = this.data;
  editedUser : User = this.editUser;

  ngOnInit(): void {
    this.editUserForm = this.fb.group({
      balance: [
        this.editUser?.balance,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]/),
        ])
      ],
      firstname: [
        this.editUser?.firstname,
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(/^[A-Za-z0-9]/),
        ])
      ],
      lastname: [
        this.editUser?.lastname,
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(/^[A-Za-z0-9]/),
        ])
      ],
      age: [
        this.editUser?.age,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]/),
        ])
      ],
      gender: [
        this.editUser?.gender,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[FM]/),
        ])
      ],
      address: [
        this.editUser?.address,
        Validators.compose([
          Validators.maxLength(30),
          Validators.pattern(/^[A-Za-z0-9_\. ]/),
        ])
      ],
      employer: [
        this.editUser?.employer,
        Validators.compose([
          Validators.maxLength(20),
          Validators.pattern(/^[A-Za-z0-9_\.]/),
        ])
      ],
      email: [
        this.editUser?.email,
        Validators.compose([
          Validators.maxLength(30),
          Validators.email,
        ])
      ],
      city: [
        this.editUser?.city,
        Validators.compose([
          Validators.maxLength(20),
          Validators.pattern(/^[A-Za-z0-9_\. ]/),
        ])
      ],
      state: [
        this.editUser?.state,
        Validators.compose([
          Validators.maxLength(20),
          Validators.pattern(/^[A-Za-z0-9_\. ]/),
        ])
      ],
      new: this.editUser?.new,
    },
    );

    new FormControl("", Validators.required, this.isUserNameDuplicated);

  }

  isUserNameDuplicated(control: AbstractControl): Observable<ValidationErrors> {
    return of({});
  }

  change(){
    this.editedUser = {
      "account_number": this.editUser.account_number,
      "balance": this.editUserForm.get('balance')?.value,
      "firstname": this.editUserForm.get('firstname')?.value,
      "lastname": this.editUserForm.get('lastname')?.value,
      "age": this.editUserForm.get('age')?.value,
      "gender": this.editUserForm.get('gender')?.value,
      "address": this.editUserForm.get('address')?.value,
      "employer": this.editUserForm.get('employer')?.value,
      "email": this.editUserForm.get('email')?.value,
      "city": this.editUserForm.get('city')?.value,
      "state": this.editUserForm.get('state')?.value,
      "new": this.editUserForm.get('new')?.value,
    };
    this.editUser = this.editedUser;
    this.data = this.editedUser;
  }

  getErrorMessage(attribute : any) : string{
    if(attribute == "age"){
      return "Your age must be between 16 and 80"
    }
    if(attribute == "balance"){
      return "Balance can not be negative!"
    }
    if(this.editUserForm.get(attribute)?.hasError('required')){
      return "You must enter a value!";
    }
    if(this.editUserForm.get(attribute)?.hasError('pattern') && !this.editUserForm.get(attribute)?.hasError('required')){
      return "Incorrect input type!";
    }
    if(!this.editUserForm.get(attribute)?.hasError('minlength') && !this.editUserForm.get(attribute)?.hasError('required')){
      return attribute as string + " too long";
    }
    if(!this.editUserForm.get(attribute)?.hasError('maxlength') && !this.editUserForm.get(attribute)?.hasError('required')){
      return attribute as string + " too short";
    }
    return "Unknown error!";
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
