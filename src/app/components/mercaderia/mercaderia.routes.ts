import { Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { MarcasComponent } from './marcas/marcas.component';
import { ModelosComponent } from './modelos/modelos.component';
import { PreciosComponent } from './precios/precios.component';
import { ProductosComponent } from './productos/productos.component';

export const rutas: Routes = [
    {path: 'categorias', component: CategoriasComponent},
    {path: 'marcas', component: MarcasComponent},
    {path: 'modelos', component: ModelosComponent},
    {path: 'precios', component: PreciosComponent},
    {path: 'productos', component: ProductosComponent},
    {path: '**', redirectTo: 'categorias', pathMatch: 'full'},
];
