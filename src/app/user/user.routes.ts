import { Routes } from '@angular/router'
import { AccountDataComponent } from '../account-data/account-data.component'
import { AccountManagementComponent } from '../account-management/account-management.component'
import { UserDetailComponent } from '../user-detail/user-detail.component'

export const userRoutes : Routes = [
  {
    path: 'account_management',
    component: AccountManagementComponent,
    children: [
      {
        path: ':firstname',
        component: UserDetailComponent,
      },
      {
        path: '',
        component: AccountDataComponent,
      }
    ]
  },
]
