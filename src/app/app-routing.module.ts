import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountManagementComponent } from './account-management/account-management.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AccountDataComponent } from './account-data/account-data.component';

const routes: Routes = [
  {
    path: 'account_management',
    component: AccountManagementComponent,
    children: [
      {
        path: ':slug',
        component: UserDetailComponent,
      },
      {
        path: '',
        component: AccountDataComponent,
      }
    ]
  },
  {
    path: '',
    component: HomePageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
