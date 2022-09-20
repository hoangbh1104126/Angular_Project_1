import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  activeUser: number;
  per: number;

  constructor() {
    this.activeUser = Math.floor(Math.random() * 555);
    this.per = Math.floor(this.activeUser/10);
  }

  ngOnInit(): void {
  }

}
