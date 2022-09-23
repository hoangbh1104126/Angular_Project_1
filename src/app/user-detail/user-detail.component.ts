import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user$ !: Observable<User>;
  id: any;
  constructor(private _route: ActivatedRoute, private _api: UserService) { }

  ngOnInit(): void {
    let account_number = this._route.snapshot.paramMap.get('account_number');
    this.id = account_number;
    this.user$ = this._api.getUserByNumber(account_number as string);
  }

  show: boolean = false;

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
