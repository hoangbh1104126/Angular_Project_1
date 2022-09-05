import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import usersData from 'src/accounts.json';
import { User } from './user';
import { delay } from 'rxjs/operators';

let Users : User[] = usersData;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsers() : Observable<User[]> {
    return of(Users).pipe(delay(0));
  }

  getUserByNumber(account_number: string) : Observable<User>{
    let user = Users.find(x => x.account_number.toString() === account_number)
    return of(user as User).pipe(delay(0));
  }

}
