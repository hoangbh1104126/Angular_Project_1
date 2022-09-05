import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import usersData from 'src/accounts.json';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-account-data',
  templateUrl: './account-data-table.component.html',
  styleUrls: ['./account-data-table.component.scss'],
})
export class AccountDataTableComponent implements OnInit {

  constructor(private _api: UserService) { }

  Users : User[] = usersData;
  UsersData = this.Users;

  ngOnInit(){ }

  filterAccount_number !: number;
  filterBalance !: number;
  filterName !: string;
  filterAge !: number;
  filterGender !: string;

  filterUser(num : number){
    switch(num){
      case 1: {
        if(typeof(this.filterAccount_number) != undefined || this.filterAccount_number.toString().length != 0){
          this.UsersData = this.UsersData.filter(
            (obj) => {
              return obj.account_number.toString().includes(this.filterAccount_number.toString());
            }
          );
        } break;
      }
      case 2: {
        if(typeof(this.filterBalance) != undefined||this.filterBalance.toString().length != 0){
          this.UsersData = this.UsersData.filter(
            (obj) => { return obj.balance.toString().includes(this.filterBalance.toString());}
          );
        } break;
      }
      case 3: {
        if(typeof(this.filterName) != undefined || this.filterName.length != 0){
          this.UsersData = this.UsersData.filter(
            (obj) => { return (obj.firstname + " " + obj.lastname).includes(this.filterName);}
          );
        } break;
      }
      case 4: {
        if(typeof(this.filterAge) != undefined || this.filterAge.toString().length != 0){
          this.UsersData = this.UsersData.filter(
            (obj) => { return obj.age.toString().includes(this.filterAge.toString());}
          );
        } break;
      }
      case 5: {
        if(typeof(this.filterGender) != undefined || this.filterGender.length != 0){
          this.UsersData = this.UsersData.filter(
            (obj) => { return obj.gender.toString().includes(this.filterGender);}
          );
        } break;
      }
    }
  }

  filterUser2(){
    this.UsersData = this.Users.filter(
      (obj) => {
        if(typeof(this.filterAccount_number) != undefined || this.filterAccount_number.toString().length != 0){
          obj.account_number.toString().includes(this.filterAccount_number.toString());
        }
        if(typeof(this.filterBalance) != undefined||this.filterBalance.toString().length != 0){
          obj.balance.toString().includes(this.filterBalance.toString());
        }
        if(typeof(this.filterName) != undefined || this.filterName.length != 0){
          (obj.firstname + " " + obj.lastname).includes(this.filterName);
        }
        if(typeof(this.filterAge) != undefined || this.filterAge.toString().length != 0){
          obj.age.toString().includes(this.filterAge.toString());
        }
        if(typeof(this.filterGender) != undefined || this.filterGender.length != 0){
          obj.gender.toString().includes(this.filterGender);
        }
      }
    )
  }

}
