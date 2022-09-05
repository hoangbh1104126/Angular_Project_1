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
  constructor(private _route: ActivatedRoute, private _api: UserService) { }

  ngOnInit(): void {
    let account_number = this._route.snapshot.paramMap.get('account_number');
    this.user$ = this._api.getUserByNumber(account_number as string);
  }

}
