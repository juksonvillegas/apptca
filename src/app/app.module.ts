import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarUserComponent } from './components/shared/navbar-user/navbar-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarUserComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
