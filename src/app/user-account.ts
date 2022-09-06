import usersData from 'src/accounts.json';
import { User } from './user';

export interface UserAccount {
  username : string;
  password : string;
  role : string;
  last_active ?: Date;
}

export interface AdminAccount extends UserAccount {
  log ?: JSON;
}

let users : User[] = usersData;
let userAccount : UserAccount[] = [];

for(var user of users){
  userAccount.push(
    {
      username : user.firstname + user.lastname,
      password : user.firstname + user.lastname + "@123",
      role : "U",
    }
  )
}

let adminAccount : AdminAccount[] = [
  {
    username : "admin",
    password : "admin@123",
    role : "A",
  }
];

userAccount = userAccount.concat(adminAccount);
