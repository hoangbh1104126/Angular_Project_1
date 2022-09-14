import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {

  ngOnInit() {
    
  }

  events: string[] = [];
  opened!: boolean;
  sayHelloTime : number = 0;

  folders: Folder[] = [
    {
      name: 'New Folder',
      create: new Date('9/1/16'),
      open: false,
    },
    {
      name: 'Folder',
      create: new Date('8/17/16'),
      open: false,
      child: [
        { name: 'Folder', create: new Date('8/23/16'), open: false, },
        { name: 'Folder', create: new Date('8/31/16'), open: false, },
      ],
    },
    {
      name: 'New Folder (2)',
      create: new Date('7/28/16'),
      open: false,
    },
  ];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _snackBar: MatSnackBar, 
  ) {}

  openSnackBar(msg: string, close: string) {
    this.sayHelloTime = this.sayHelloTime + 1;
    this._snackBar.open(msg, close, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openFolder(number : number){
    this.folders[number].open = !this.folders[number].open;
    let str = this.folders[number].open ? "Open" : "Close";
    this.openSnackBar(str +" folder: " + this.folders[number].name + "!","Ok")
  }
}

export interface Folder {
  name: string;
  create: Date;
  open: boolean;
  child?: Folder[];
}
