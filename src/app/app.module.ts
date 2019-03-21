import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {NotifierModule} from 'angular-notifier';
import { AppComponent } from './app.component';
import { NavbarUserComponent } from './components/shared/navbar-user/navbar-user.component';
import { ClientesComponent } from './components/clientes/clientes/clientes.component';
import { APP_ROUTES } from './app.routes';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { Options } from '../../node_modules/@types/selenium-webdriver/firefox';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { MercaderiaComponent } from './components/mercaderia/mercaderia.component';
import { CategoriasComponent } from './components/mercaderia/categorias/categorias.component';
import { MarcasComponent } from './components/mercaderia/marcas/marcas.component';
import { ModelosComponent } from './components/mercaderia/modelos/modelos.component';
import { PreciosComponent } from './components/mercaderia/precios/precios.component';
import { ProductosComponent } from './components/mercaderia/productos/productos.component';
import { GetcategoriaComponent } from './components/shared/getcategoria/getcategoria.component';
import { ListaComponent } from './components/proveedores/lista/lista.component';
import { AgregarComponent } from './components/proveedores/agregar/agregar.component';
import { EliminarComponent } from './components/proveedores/eliminar/eliminar.component';
import { BuscadormodelComponent } from './components/shared/buscadormodel/buscadormodel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarUserComponent,
    ClientesComponent,
    ProveedoresComponent,
    PaginationComponent,
    MercaderiaComponent,
    CategoriasComponent,
    MarcasComponent,
    ModelosComponent,
    PreciosComponent,
    ProductosComponent,
    GetcategoriaComponent,
    ListaComponent,
    AgregarComponent,
    EliminarComponent,
    BuscadormodelComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    NotifierModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
