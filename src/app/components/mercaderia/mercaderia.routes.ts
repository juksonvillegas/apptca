import { Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { MarcasComponent } from './marcas/marcas.component';
import { ModelosComponent } from './modelos/modelos.component';
import { PreciosComponent } from './precios/precios.component';
import { CategariasRoutes} from './categorias/categorias.routers';
import { MarcasRoutes } from './marcas/marcas.routers';
import { ModelosRoutes } from './modelos/modelos.routers';
import { ProductosComponent } from './productos/productos.component';

export const rutas: Routes = [
    {path: 'categorias', component: CategoriasComponent, children: CategariasRoutes},
    {path: 'marcas', component: MarcasComponent, children: MarcasRoutes},
    {path: 'modelos', component: ModelosComponent, children: ModelosRoutes},
    {path: 'precios', component: PreciosComponent},
    {path: 'productos', component: ProductosComponent},
    {path: '**', redirectTo: 'categorias', pathMatch: 'full'},
];
