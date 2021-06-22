import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FusionChartsModule } from "angular-fusioncharts";
import { NavbarComponent } from './components/navbar/navbar.component';
import { ImportDataComponent } from './components/admin/import-data/import-data.component';
import { ManageCompaniesComponent } from './components/admin/manage-companies/manage-companies.component';
import { ManageExchangesComponent } from './components/admin/manage-exchanges/manage-exchanges.component';
import { UserIpoComponent } from './components/user/user-ipo/user-ipo.component';
import { UserCompareSectorsComponent } from './components/user/user-compare-sectors/user-compare-sectors.component';
import { UserCompareCompaniesComponent } from './components/user/user-compare-companies/user-compare-companies.component';
import { UserUpdateProfileComponent } from './components/user/user-update-profile/user-update-profile.component';
import { ManageIPOsComponent } from './components/admin/manage-ipos/manage-ipos.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserLandingPageComponent } from './components/user/user-landing-page/user-landing-page.component';
import { AdminLandingPageComponent } from './components/admin/admin-landing-page/admin-landing-page.component';

import { JwtInterceptor } from './services/jwt.interceptor';
import { ErrorInterceptor } from './services/error.interceptor';

// // Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { CompareFormComponent } from './components/user/compare-form/compare-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCompanyComponent } from './components/admin/add-company/add-company.component';
import { AddIpoComponent } from './components/admin/add-ipo/add-ipo.component';
import { AddStockExchangeComponent } from './components/admin/add-stock-exchange/add-stock-exchange.component';
import { ConfirmUserComponent } from './components/confirm-user/confirm-user.component';
import { CompareComponent } from './components/user/compare/compare.component';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ImportDataComponent,
    ManageCompaniesComponent,
    ManageExchangesComponent,
    UserIpoComponent,
    UserCompareSectorsComponent,
    UserCompareCompaniesComponent,
    UserUpdateProfileComponent,
    ManageIPOsComponent,
    LoginComponent,
    RegisterComponent,
    UserLandingPageComponent,
    AdminLandingPageComponent,
    CompareFormComponent,
    LandingPageComponent,
    AddCompanyComponent,
    AddIpoComponent,
    AddStockExchangeComponent,
    ConfirmUserComponent,
    CompareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FusionChartsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
