import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PagenotFoundComponent } from './pagenotFound/pagenotFound.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddHeadersInterceptor } from './services/add-headers.interceptor';
import { ToastComponent } from './toast/toast.component';
import { ShowDialogComponent } from './common/show-dialog/show-dialog.component';
import { AgGridModule } from 'ag-grid-angular';
import { AddContactComponent } from './addContact/addContact.component';
import { ContactListComponent } from './contactList/contactList.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [								
    AppComponent,
      LoginComponent,
      PagenotFoundComponent,
      RegisterComponent,
      ForgotPasswordComponent,
      HomeComponent,
      ToastComponent,
      ShowDialogComponent,
      AddContactComponent,
      ContactListComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AgGridModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AddHeadersInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
