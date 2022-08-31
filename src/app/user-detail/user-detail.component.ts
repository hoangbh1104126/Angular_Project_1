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
    let firstname = this._route.snapshot.paramMap.get('firstname');
    this.user$ = this._api.getUserByNumber(firstname as string);
  }

}
