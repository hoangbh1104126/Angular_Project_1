
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInRfComponent } from './sign-in-rf.component';

const routes: Routes = [
  {
    path: '',
    component: SignInRfComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignInRfRoutingModule { }
