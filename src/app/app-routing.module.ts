import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDataTableComponent } from './account-data-table/account-data-table.component';
import { AccountDataComponent } from './account-data/account-data.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LogInComponent } from './log-in/log-in.component';

import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {
    path: 'account_management',
    component: AccountManagementComponent,
    children: [
      {
        path: ':account_number',
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
    component: HomePageComponent,
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: "log-in",
    loadChildren: () => import('./log-in/log-in.module').then(m => m.LogInModule),

  },
  {
    path: 'test',
    component: AccountDataTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
