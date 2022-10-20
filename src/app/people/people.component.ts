import { Component, VERSION ,OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import usersData from 'src/accounts.json';
import { User } from '../user';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  animations:[
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class PeopleComponent implements OnInit {

  users: User[] = usersData;

  breakpoint: number;

  users1: User[] = [];
  users2: User[] = [];
  users3: User[] = [];

  constructor() {
    this.breakpoint = window.innerWidth <= 1280 ? window.innerWidth <= 600 ? 1 : 2 : 3;
    switch(this.breakpoint){
      case 3: {
        this.users1 = this.users.slice(0, 333);
        this.users2 = this.users.slice(333, 666);
        this.users3 = this.users.slice(666, 999);
        break;
      }
      case 2: {
        this.users1 = this.users.slice(0, 499);
        this.users2 = this.users.slice(500, 999);
        break;
      }
      case 1: {
        this.users1 = this.users;
        break;
      }
    }
    this.isLoading = new Array(1000).fill(true);
  }

  ngDoCheck(){
    this.breakpoint = window.innerWidth <= 1280 ? window.innerWidth <= 600 ? 1 : 2 : 3;
  }

  current = 0;
  img_load = ['assets/image/loading.gif'];
  isLoading: boolean[];

  ngOnInit() {
    setInterval(() => {
      this.current = ++this.current % 333;
    }, 2000);
  }

  styleGender(element : User): Object {
    if (element.gender == "M"){
      return {
        'padding': '30px',
        'font-size': '32px',
        'background-color': '#e8fff3',
        'color': '#95cf89'
      }
    }
    return {
      'padding': '30px',
      'font-size': '32px',
      'background-color': '#fff5f8',
      'color': '#f27d9d'
    }
  }

}
