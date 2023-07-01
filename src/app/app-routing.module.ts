import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotFoundComponent } from './pagenotFound/pagenotFound.component';
import { RegisterComponent } from './register/register.component';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AddContactComponent } from './addContact/addContact.component';
import { ContactListComponent } from './contactList/contactList.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'forgot', component: ForgotPasswordComponent},
  {path:'home/:id', component: HomeComponent, canActivate: [CheckAuthGuard],
 children: [
  {path:'', redirectTo: 'contactList', pathMatch:"full"},
  {path:'addContact', component: AddContactComponent},
  {path:'contactList', component: ContactListComponent}
 ] },
  {path:"**", component: PagenotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
