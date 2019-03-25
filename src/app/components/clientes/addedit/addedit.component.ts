import { Component } from '@angular/core';
import { ApiService } from '../../../servicios/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-addedit',
  templateUrl: './addedit.component.html',
})
export class AddeditClientesComponent {
  modelo = 'clientes/';
  id = '';
  dato = {nombre: '', telefono: '', dni: '', sexo: true, mayorista: false };
  private readonly notifier: NotifierService;
  constructor(private servicio: ApiService,
    private rutaActiva: ActivatedRoute,
    private router: Router,
    notifierService: NotifierService) {
    this.notifier = notifierService;
    this.CargarDatos();
  }
  CargarDatos() {
    this.id = this.rutaActiva.snapshot.params.id;
    if (this.id) {
      this.servicio.getDataId(this.modelo, this.id).subscribe(
        data => {
          this.dato = data;
        },
        error => {
          if (error.status === 404) {
            this.router.navigateByUrl('/clientes/ver');
          } else { console.log(error); }
        }
      );
    }
  }
  accion() {
    if (this.id) {
      this.editar();
    } else {this.agregar(); }
  }
  editar() {
    this.servicio.updateData(this.modelo, this.dato).subscribe(
      data => {
        this.router.navigateByUrl('/clientes/ver');
        this.notifier.notify('success', 'Registro actualizado...OK!');
      },
      error => {
        this.notifier.notify('error', error.name);
      }
    );
  }
  agregar() {
    this.servicio.addData(this.modelo, this.dato).subscribe(
      data => {
        this.router.navigateByUrl('/clientes/ver');
        this.notifier.notify('success', 'Registro agregado...OK!');
      },
      error => {
        console.log(error);
      }
    );
  }
}
