import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarUserComponent } from './components/shared/navbar-user/navbar-user.component';
import { ClientesComponent } from './components/clientes/clientes/clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarUserComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
