import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import usersData from 'src/accounts.json';
import { User } from '../user';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  userData: User[] = usersData;
  mostBalance: User[] = [];
  oldest: User[] = [];
  youngest: User[] = [];

  constructor(public router: Router,) {
    this.mostBalance.push(
      this.findUserByID(820), 
      this.findUserByID(894),
      this.findUserByID(953), 
      this.findUserByID(87), 
      this.findUserByID(411),
    );
    this.oldest.push(
      this.findUserByID(291), 
      this.findUserByID(474),
      this.findUserByID(479), 
      this.findUserByID(549), 
      this.findUserByID(664),
    );
    this.youngest.push(
      this.findUserByID(157), 
      this.findUserByID(215),
      this.findUserByID(816), 
      this.findUserByID(905), 
      this.findUserByID(95),
    );
  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['account_number', 'firstname', 'balance', 'age', 'gender'];
  dataSource1 = this.mostBalance;
  dataSource2 = this.oldest;
  dataSource3 = this.youngest;

  findUserByID(id: number): User{
    return this.userData.find((user) => user.account_number === id) as User;
  }

  styleGender(element : User): Object {
    if (element.gender == "M"){
        return {
          'background-color': '#e8fff3',
          'color': '#95cf89'
        }
    }
    return {
      'background-color': '#fff5f8',
      'color': '#f27d9d'
    }
  }

}