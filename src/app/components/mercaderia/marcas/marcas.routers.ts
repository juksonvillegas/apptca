import { Routes } from '@angular/router';
import { ListaMarcasComponent } from './lista/lista.component';
import { AddeditMarcasComponent } from './addedit/addedit.component';
import { EliminarMarcasComponent } from './eliminar/eliminar.component';

export const MarcasRoutes: Routes = [
    {path: 'ver', component: ListaMarcasComponent},
    {path: 'agregar', component: AddeditMarcasComponent},
    {path: 'eliminar/:id', component: EliminarMarcasComponent},
    {path: 'editar/:id', component: AddeditMarcasComponent},
    {path: '**', redirectTo: 'agregar', pathMatch: 'full'},
];
