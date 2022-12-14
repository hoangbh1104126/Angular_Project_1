import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDataComponent } from '../account-data/account-data.component';
import { BusinessComponent } from '../business/business.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PeopleComponent } from '../people/people.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { TableDataComponent } from '../table-data/table-data.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';

import { AccountManagementComponent } from './account-management.component';

const routes: Routes = [
    {
      path: '',
      component: AccountManagementComponent,
      children: [
        {
          path: 'user',
          children: [
            {
              path: ':account_number',
              loadChildren: () => import('../user-detail/user-detail.module').then(m => m.UserDetailModule),
            }
          ]
        },
        {
          path: 'dashboard',
          component: DashboardComponent,
        },
        {
          path: 'business',
          component: BusinessComponent,
          children: [
            {
              path: 'account-data',
              component: AccountDataComponent,
            }
          ]
        },
        {
          path: 'people',
          component: PeopleComponent,
        },
        {
          path: 'statistics',
          component: StatisticsComponent,
        },
        {
          path: 'account-data',
          component: AccountDataComponent,
        },
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full',
        }
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountManagementRoutingModule { }
