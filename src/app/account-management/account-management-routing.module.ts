import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDataComponent } from '../account-data/account-data.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';

import { AccountManagementComponent } from './account-management.component';

const routes: Routes = [
    {
        path: '',
        component: AccountManagementComponent,
        children: [
          {
            path: ':account_number',
            //component: UserDetailComponent,
            loadChildren: () => import('../user-detail/user-detail.module').then(m => m.UserDetailModule)
          },
          {
            path: '',
            component: AccountDataComponent,
          }
        ]
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountManagementRoutingModule { }
