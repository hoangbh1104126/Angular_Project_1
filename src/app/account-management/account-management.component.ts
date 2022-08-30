import { Component, OnInit } from '@angular/core';
import usersData from 'src/accounts.json';
import { User } from '../user';


let Users : User[] = usersData;

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(){

  }

}
