import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  activeUser: number;
  per1: number;

  total: number = 1234567;
  large: number = 49587;
  per2: number = Math.floor(this.large*100/this.total);

  constructor() {
    this.activeUser = Math.floor(Math.random() * 555);
    this.per1 = Math.floor(this.activeUser/10);
  }

  ngOnInit(): void {
  }

}
