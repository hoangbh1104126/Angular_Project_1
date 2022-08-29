import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountManagementComponent } from './account-management/account-management.component';
import { HomePageComponent } from './home-page/home-page.component';


//import usersData from '../accounts.json';
//import { User } from './user';

//let users: User[] = usersData;

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'account_management',
    component: AccountManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
