import { Component, OnInit } from '@angular/core';
import usersData from 'src/accounts.json';
import { User } from '../user';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {
  nameHover !: boolean;
  constructor(){
    this.nameHover = false;
  }

  ngOnInit(){
    console.log(this.users);
  }
  myFunction(x : any) {
    x.classList.toggle("change");
  }

  users: User[] = usersData;

  nameOnHover(num : number){
    this.nameHover = !this.nameHover;
  }
}
