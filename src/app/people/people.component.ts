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

  users1: User[] = this.users.slice(0, 333);
  users2: User[] = this.users.slice(333, 666);
  users3: User[] = this.users.slice(666, 999);

  constructor() {
  }

  current = 0;
  img_load = ['assets/image/loading.gif'];
  isLoading: boolean[] = new Array(1000).fill(true);

  ngOnInit() {
    setInterval(() => {
      this.current = ++this.current % 111;
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
