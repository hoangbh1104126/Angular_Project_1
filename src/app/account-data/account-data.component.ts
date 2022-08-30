import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import usersData from 'src/accounts.json';
import { User } from '../user';
import { UserService } from '../user.service';

let Users : User[] = usersData;

@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.scss']
})
export class AccountDataComponent implements OnInit {
  users$ !: Observable<User[]>;
  constructor(private _api: UserService) { }

  ngOnInit(){
    this.users$ = this._api.getUsers();
  }

}
