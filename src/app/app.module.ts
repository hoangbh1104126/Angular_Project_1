import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AccountDataComponent } from './account-data/account-data.component';
import { AccountManagementComponent } from './account-management/account-management.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './log-in/log-in.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from './add-user/add-user.component';
import { AppMaterialModule } from './app.material.module';
import { GenderPipe } from './gender.pipe';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NoValuePipe } from './no-value.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { CheckPipe } from './check.pipe';
import { LoadingComponent } from './loading/loading.component';
import { PeopleComponent } from './people/people.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { checkComponent } from './confirm/action/check.component';
import { CountUpDirective } from './count-up.directive';
import { CountUpMoneyDirective } from './count-up-money.directive';
import { HighlightSearchPipe } from './highlight-search.pipe';
import { TestComponent } from './test/test.component';
import { MinDirective, MaxDirective } from './range.directive';
import { TestApiComponent } from './test-api/test-api.component';
import { HttpClientModule } from '@angular/common/http';
import { TestInfScrollComponent } from './test-inf-scroll/test-inf-scroll.component';
import { ThemeModeComponent } from './theme-mode/theme-mode.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AccountDataComponent,
    AccountManagementComponent,
    UserDetailComponent,
    LogInComponent,
    AddUserComponent,
    GenderPipe,
    EditUserComponent,
    NoValuePipe,
    PageNotFoundComponent,
    DashboardComponent,
    ConfirmComponent,
    CheckPipe,
    LoadingComponent,
    PeopleComponent,
    StatisticsComponent,
    checkComponent,
    CountUpDirective,
    CountUpMoneyDirective,
    HighlightSearchPipe,
    TestComponent,
    MinDirective,
    MaxDirective,
    TestApiComponent,
    TestInfScrollComponent,
    ThemeModeComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    AppMaterialModule,
    NgApexchartsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppModule { }
