import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Observable, of } from 'rxjs';
import { checkComponent } from '../confirm/action/check.component';
import { ConfirmComponent, ConfirmDialogModel } from '../confirm/confirm.component';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  orientation: StepperOrientation;

  created: boolean = false;

  displayList: string[] = ['account_number', 'balance', 'firstname', 'age', 'gender', 'address', 'employer', 'email', 'city', 'state'];
  onDisplayList: string[] = ['account_number', 'balance', 'firstname', 'age', 'gender'];
  display = new FormControl(this.onDisplayList);

  tableForm: FormGroup = this.fb.group({
    modeLoading: [
      "paging",
      Validators.compose([
        Validators.required,
      ])
    ],
    row: [
      "5",
      Validators.compose([
        Validators.required,
      ])
    ],
    showLoading: true,
  });

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) {
    this.orientation = window.innerWidth > 960 ? 'horizontal' : 'vertical';
  }

  ngOnInit(): void {
    console.log("Cilent side table mode available at routing: account-data");
  }

  isUserNameDuplicated(control: AbstractControl): Observable<ValidationErrors> {
    return of({});
  }

  createTable() {
    const message = `Are you sure to create table?`;
    const dialogData = new ConfirmDialogModel("Create table", message);
    const dialogRef = this.dialog.open(ConfirmComponent, {
      maxWidth: "400px",
      data: dialogData,
      panelClass: ['animate__animated', 'animate__slideInDown', 'animate__bounce'] //Angular Animation
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      let enterAnimationDuration = "550ms";
      let exitAnimationDuration = "650ms";
      if (confirmed) {
        this.created = true;
        this.dialog.open(checkComponent, {
          width: '325px',
          height: '325px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: {
            msg: "Table create!",
            check: true,
          }
        });
      } else {
        this.dialog.open(checkComponent, {
          width: '325px',
          height: '325px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: {
            msg: "Table was not created!",
            check: false,
          }
        });
      }
    });
  }

  onValueChange(str: any) {
    console.log("change");
    if (str == "scroll") {
      this.tableForm.get("row")?.setValue("30");
    } else {
      this.tableForm.get("row")?.setValue("5");
    }
  }

  @ViewChild('stepper') private stepper!: MatStepper;

  goToStep(index: number) {
    this.stepper.linear = false;
    this.stepper.selectedIndex = index;
    if (index === 2) {
      setTimeout(() => {
        this.stepper.linear = true;
      }, 10);
    }
  }

  chooseType: boolean = false;

  ngDoCheck(){
    this.orientation = window.innerWidth > 960 ? 'horizontal' : 'vertical';
  }

  resetAll() {
    this.stepper.linear = true;
    this.tableForm.reset();
    this.stepper.reset();
    this.tableForm.get("modeLoading")?.setValue("paging");
    this.tableForm.get("row")?.setValue("5");
    this.tableForm.get("showLoading")?.setValue(true);
    this.created = false;
    this.onDisplayList = ['account_number', 'balance', 'firstname', 'age', 'gender'];
    this.display = new FormControl(this.onDisplayList);
    this.chooseType = false;
  }

}
