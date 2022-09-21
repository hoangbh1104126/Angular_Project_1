import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition('* => void', [
        style({ opacity: 1 }),
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {

  activeUser: number;
  per1: number;

  total: number = 1234567;
  large: number = 49587;
  per2: number = Math.floor(this.large*100/this.total);

  current = 0;

  business_img = [
    'assets/image/business_1.jpeg',
    'assets/image/business_3.jpeg',
    'assets/image/business_2.jpeg'
  ];

  people_img = [
    'assets/image/people_1.jpeg',
    'assets/image/people_2.jpeg',
    'assets/image/people_3.jpeg',
  ];

  statistics_img = [
    'assets/image/statistics_1.jpeg',
    'assets/image/statistics_1.jpeg',
    'assets/image/statistics_1.jpeg'
  ]

  constructor() {
    this.activeUser = Math.floor(Math.random() * 555);
    this.per1 = Math.floor(this.activeUser/10);
  }

  ngOnInit(): void {
    setInterval(() => {
      this.current = ++this.current % 3;
    }, 2000);
  }

}
