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
  styleUrls: ['./account-management.component.scss'],
  host: {
    "(window:resize)":"onWindowResize($event)"
  }
})
export class AccountManagementComponent implements OnInit {

  width:number = window.innerWidth;

  onWindowResize(event: any) {
      this.width = event.target.innerWidth;
  }

  opened: boolean = this.width < 1000 ? false : true;
  modeNavigation: any = this.width < 1000 ? 'over' : 'side';
  backdropNavigation: boolean = this.width < 1000 ? true : false;

  ngOnInit() {
    if(this.isLoggedIn){
      this.openSnackBar("Hello " + this.userLoggedIn?.firstname + " " + this.userLoggedIn?.lastname + "!", "Continue");
    }

  }

  userData : User[] = usersData;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  link !: string;

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.link = this.router.url;
  }

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
    this.router.navigateByUrl('/account_management/user/' + this.userLoggedIn?.account_number);
  }

  signOut(){
    this.openSnackBar("Logged out!", "Ok")
    this.router.navigateByUrl('/log-in');
  }

  goToPage(str: string){
    if(str.includes('business')){
      this.router.navigateByUrl("/loading");
    }
    else {this.router.navigateByUrl("/account_management" + str);}
    this.link = "/account_management" + str;
  }

  onDisplay(str: string): Object{
    if(this.link.includes(str)){
      return {
        'font-weight': 'bold',
        'color': 'whitesmoke',
      }
    } return {}
  }

  bar1: Object = {'transform': 'translate(0, 10px) rotate(-45deg)'};
  bar2: Object = {'opacity': '0'};
  bar3: Object = {'transform': 'translate(0, -10px) rotate(45deg)'};

  openMenu() {
    if(!this.opened){
      this.bar1 = {'transform': 'translate(0, 9.5px) rotate(-45deg)'};
      this.bar2 = {'opacity': '0'};
      this.bar3 = {'transform': 'translate(0, -9.5px) rotate(45deg)'};
    } else {
      this.bar1 = {};
      this.bar2 = {};
      this.bar3 = {};
    }
  }

  task() {
    let date = new Date().toLocaleString();
    this.openSnackBar(date + ": Great, no task are due!", '\u{2705}');
  }
}
