import { Routes } from '@angular/router';
import { ListaCategoriasComponent } from './lista/lista.component';
import { AddeditCategoriasComponent } from './addedit/addedit.component';


export const CategariasRoutes: Routes = [
    {path: 'ver', component: ListaCategoriasComponent},
     {path: 'agregar', component: AddeditCategoriasComponent},
    // {path: 'eliminar/:id', component: ClientesEliminarComponent},
    {path: 'editar/:id', component: AddeditCategoriasComponent},
    {path: '**', redirectTo: 'agregar', pathMatch: 'full'},
];
