import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: 'account_management',
    loadChildren: () => import('./account-management/account-management.module').then((m) => m.AccountManagementModule),
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
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
