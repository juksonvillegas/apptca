import { Routes } from '@angular/router';
import { ClientesListaComponent } from './lista/lista.component';
import { ClientesEliminarComponent } from './eliminar/eliminar.component';
import { AddeditClientesComponent } from './addedit/addedit.component';


export const ClientesRutas: Routes = [
    {path: 'ver', component: ClientesListaComponent},
    {path: 'agregar', component: AddeditClientesComponent},
    {path: 'eliminar/:id', component: ClientesEliminarComponent},
    {path: 'editar/:id', component: AddeditClientesComponent},
    {path: '**', redirectTo: 'agregar', pathMatch: 'full'},
];
