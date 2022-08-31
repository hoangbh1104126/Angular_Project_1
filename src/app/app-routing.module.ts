import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDataComponent } from './account-data/account-data.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignInRfComponent } from './sign-in-rf/sign-in-rf.component';

import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
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
  {
    path: '',
    component: HomePageComponent,
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: "sign-in-rf",
    loadChildren: () => import('./sign-in-rf/sign-in-rf.module').then(m => m.SignInRfModule),

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
