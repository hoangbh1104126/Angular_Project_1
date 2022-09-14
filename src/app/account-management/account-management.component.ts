import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { User } from '../user';
import usersData from 'src/accounts.json';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {

  ngOnInit() { }

  opened!: boolean;
  sayHelloTime : number = 0;

  userData : User[] = usersData;

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
    private router: Router,
  ) { }

  test = (this.router.getCurrentNavigation() as Navigation).extras.state;
  isLoggedIn: boolean = this.test == undefined || this.test == null? false : true;
  userLoggedInNumber = JSON.stringify(this.test);
  userLoggedIn : User | undefined = this.getUserIdFromJSONString(this.userLoggedInNumber);

  getUserIdFromJSONString(str: string) : User | undefined{
    if(str == undefined || str.length == 0){
      return undefined;
    }
    let numStr : string[] = str.split('\"');
    const id = Number(numStr[3]);
    return this.userData.find((obj) => obj.account_number == id);
  }

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

  viewUserDetails(){
    this.router.navigateByUrl('/account_management/' + this.userLoggedIn?.account_number);
  }

  signOut(){
    this.openSnackBar("Logged out!", "Ok")
    this.router.navigateByUrl('/log-in');
  }
}

export interface Folder {
  name: string;
  create: Date;
  open: boolean;
  child?: Folder[];
}
