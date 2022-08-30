import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AccountManagementComponent } from './account-management/account-management.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AccountDataComponent } from './account-data/account-data.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AccountManagementComponent,
    UserDetailComponent,
    AccountDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
