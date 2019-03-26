import { Routes } from '@angular/router';
import { ListaModelosComponent } from './lista/lista.component';
import { AddeditModelosComponent } from './addedit/addedit.component';

export const ModelosRoutes: Routes = [
    {path: 'ver', component: ListaModelosComponent},
    {path: 'agregar', component: AddeditModelosComponent},
    // {path: 'eliminar/:id', component: EliminarMarcasComponent},
    // {path: 'editar/:id', component: AddeditMarcasComponent},
    {path: '**', redirectTo: 'agregar', pathMatch: 'full'},
];
