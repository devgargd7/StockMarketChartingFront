import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ImportDataComponent } from './components/admin/import-data/import-data.component';
import { ManageCompaniesComponent } from './components/admin/manage-companies/manage-companies.component';
import { ManageExchangesComponent } from './components/admin/manage-exchanges/manage-exchanges.component';
import { ManageIPOsComponent } from './components/admin/manage-ipos/manage-ipos.component';
import { ConfirmUserComponent } from './components/confirm-user/confirm-user.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CompareComponent } from './components/user/compare/compare.component';
import { UserCompareSectorsComponent } from './components/user/user-compare-sectors/user-compare-sectors.component';
import { UserIpoComponent } from './components/user/user-ipo/user-ipo.component';
import { UserUpdateProfileComponent } from './components/user/user-update-profile/user-update-profile.component';
import { AuthGuard } from './gaurds/auth.gaurd';
import { Role } from './models/User';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin/import', component: ImportDataComponent, canActivate: [AuthGuard],data: { roles: [Role.Admin] }},
  {path: 'admin/company', component: ManageCompaniesComponent, canActivate: [AuthGuard],data: { roles: [Role.Admin] }},
  {path: 'admin/exchange', component: ManageExchangesComponent, canActivate: [AuthGuard],data: { roles: [Role.Admin] }},
  {path: 'admin/ipo', component: ManageIPOsComponent, canActivate: [AuthGuard],data: { roles: [Role.Admin] }},
  {path: 'user/ipo', component: UserIpoComponent, canActivate: [AuthGuard]},
  {path: 'user/compare', component: CompareComponent, canActivate: [AuthGuard]},
  {path: 'user/sectors', component: UserCompareSectorsComponent, canActivate: [AuthGuard]},
  {path: 'user/profile', component: UserUpdateProfileComponent, canActivate: [AuthGuard]},
  {path: 'confirm', component: ConfirmUserComponent },
  {path: 'logout', redirectTo: 'login'}
  // { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
