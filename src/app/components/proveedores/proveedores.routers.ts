import { Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { AgregarComponent } from './agregar/agregar.component';
import { EliminarComponent } from './eliminar/eliminar.component';


export const ProveedoresRutas: Routes = [
    {path: 'ver', component: ListaComponent},
    {path: 'agregar', component: AgregarComponent},
    {path: 'eliminar/:id', component: EliminarComponent},
    {path: '**', redirectTo: 'ver', pathMatch: 'full'},
];
