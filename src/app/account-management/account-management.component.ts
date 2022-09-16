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

  userData : User[] = usersData;
  opened !: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  modeNavigation: any = "over";
  backdropNavigation: boolean = true;

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
    this._snackBar.open(msg, close, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  viewUserDetails(){
    this.router.navigateByUrl('/account_management/' + this.userLoggedIn?.account_number);
  }

  signOut(){
    this.openSnackBar("Logged out!", "Ok")
    this.router.navigateByUrl('/log-in');
  }

  goToPage(str: string){
    this.router.navigateByUrl("/account_management" + str);
    if(str === "/dashboard"){
      this.modeNavigation = "push";
      this.backdropNavigation = false;
    } else {
      this.modeNavigation = "over";
      this.backdropNavigation = true;
    }
  }
}
