import { Routes } from '@angular/router';
import { ProveedoresListaComponent } from './lista/lista.component';
import { ProveedoresAgregarComponent } from './agregar/agregar.component';
import { ProveedoresEliminarComponent } from './eliminar/eliminar.component';
import { AddeditProveedoresComponent } from './addedit/addedit.component';


export const ProveedoresRutas: Routes = [
    {path: 'ver', component: ProveedoresListaComponent},
    {path: 'agregar', component: AddeditProveedoresComponent},
    {path: 'eliminar/:id', component: ProveedoresEliminarComponent},
    {path: 'editar/:id', component: AddeditProveedoresComponent},
    {path: '**', redirectTo: 'agregar', pathMatch: 'full'},
];
