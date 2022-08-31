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

  getUserByNumber(firstname: string) : Observable<User>{
    let user = Users.find(x => x.firstname === firstname)
    return of(user as User).pipe(delay(0));
  }

}
