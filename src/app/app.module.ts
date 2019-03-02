import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import {NotifierModule} from 'angular-notifier';
import {NgxMaskModule} from 'ngx-mask';

import { AppComponent } from './app.component';
import { NavbarUserComponent } from './components/shared/navbar-user/navbar-user.component';
import { ClientesComponent } from './components/clientes/clientes/clientes.component';
import { GruposComponent } from './components/productos/grupos/grupos.component';
import { CategoriasComponent } from './components/productos/categorias/categorias.component';
import { MarcasComponent } from './components/productos/marcas/marcas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { APP_ROUTES } from './app.routes';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { EditarclientesComponent } from './components/clientes/editarclientes/editarclientes.component';
import { Options } from '../../node_modules/@types/selenium-webdriver/firefox';

@NgModule({
  declarations: [
    AppComponent,
    NavbarUserComponent,
    ClientesComponent,
    GruposComponent,
    CategoriasComponent,
    MarcasComponent,
    ProductosComponent,
    EditarclientesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    HttpClientModule,
    FormsModule,
    NotifierModule,
    NgxMaskModule.forRoot(),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
