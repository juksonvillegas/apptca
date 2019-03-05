import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes/clientes.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component'; 

const appRoutes: Routes = [
    {path: 'clientes', component: ClientesComponent},
    {path: 'proveedores', component: ProveedoresComponent},
    {path: 'productos', component: ProductosComponent},
    {path: '', redirectTo: '/clientes', pathMatch: 'full'},
    {path: '**', redirectTo: '/clientes', pathMatch: 'full'},
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: false});
