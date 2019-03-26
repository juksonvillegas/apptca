import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {NotifierModule} from 'angular-notifier';
import { AppComponent } from './app.component';
import { NavbarUserComponent } from './components/shared/navbar-user/navbar-user.component';
import { ClientesComponent } from './components/clientes/clientes/clientes.component';
import { APP_ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { MercaderiaComponent } from './components/mercaderia/mercaderia.component';
import { CategoriasComponent } from './components/mercaderia/categorias/categorias.component';
import { MarcasComponent } from './components/mercaderia/marcas/marcas.component';
import { ModelosComponent } from './components/mercaderia/modelos/modelos.component';
import { PreciosComponent } from './components/mercaderia/precios/precios.component';
import { ProductosComponent } from './components/mercaderia/productos/productos.component';
import { GetcategoriaComponent } from './components/shared/getcategoria/getcategoria.component';
import { ProveedoresListaComponent } from './components/proveedores/lista/lista.component';
import { ProveedoresAgregarComponent } from './components/proveedores/agregar/agregar.component';
import { ProveedoresEliminarComponent } from './components/proveedores/eliminar/eliminar.component';
import { BuscadormodelComponent } from './components/shared/buscadormodel/buscadormodel.component';
import { ClientesListaComponent } from './components/clientes/lista/lista.component';
import { ClientesEliminarComponent } from './components/clientes/eliminar/eliminar.component';
import { AddeditClientesComponent } from './components/clientes/addedit/addedit.component';
import { AddeditProveedoresComponent } from './components/proveedores/addedit/addedit.component';
import { ListaCategoriasComponent } from './components/mercaderia/categorias/lista/lista.component';
import { AddeditCategoriasComponent } from './components/mercaderia/categorias/addedit/addedit.component';
import { EliminarCategoriasComponent } from './components/mercaderia/categorias/eliminar/eliminar.component';
import { AddeditMarcasComponent } from './components/mercaderia/marcas/addedit/addedit.component';
import { EliminarMarcasComponent } from './components/mercaderia/marcas/eliminar/eliminar.component';
import { ListaMarcasComponent } from './components/mercaderia/marcas/lista/lista.component';
import { ListaModelosComponent } from './components/mercaderia/modelos/lista/lista.component';
import { EliminarModelosComponent } from './components/mercaderia/modelos/eliminar/eliminar.component';
import { AddeditModelosComponent } from './components/mercaderia/modelos/addedit/addedit.component';

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
    ProveedoresComponent,
    ProveedoresListaComponent,
    ProveedoresAgregarComponent,
    ProveedoresEliminarComponent,
    BuscadormodelComponent,
    ClientesListaComponent,
    ClientesEliminarComponent,
    AddeditClientesComponent,
    AddeditProveedoresComponent,
    ListaCategoriasComponent,
    AddeditCategoriasComponent,
    EliminarCategoriasComponent,
    AddeditMarcasComponent,
    EliminarMarcasComponent,
    ListaMarcasComponent,
    ListaModelosComponent,
    AddeditModelosComponent,
    EliminarModelosComponent
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
