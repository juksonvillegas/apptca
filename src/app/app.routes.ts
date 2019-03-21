import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes/clientes.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { MercaderiaComponent } from './components/mercaderia/mercaderia.component';
import { rutas } from './components/mercaderia/mercaderia.routes';
import { ProveedoresRutas} from './components/proveedores/proveedores.routers';

const appRoutes: Routes = [
    {path: 'clientes', component: ClientesComponent},
    {path: 'proveedores', component: ProveedoresComponent, children: ProveedoresRutas},
    {path: 'productos', component: MercaderiaComponent, children: rutas},
    {path: '', redirectTo: '/clientes', pathMatch: 'full'},
    {path: '**', redirectTo: '/clientes', pathMatch: 'full'},
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: false});
