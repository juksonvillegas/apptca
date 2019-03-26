import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ApiService } from '../../../../servicios/api.service';

@Component({
  selector: 'app-addedit',
  templateUrl: './addedit.component.html'
})
export class AddeditMarcasComponent {
  modelo = 'marcas/';
  id = '';
  dato = {nombre: '' };
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
            this.router.navigateByUrl('/productos/marcas/ver');
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
        this.router.navigateByUrl('/productos/marcas/ver');
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
        this.router.navigateByUrl('/productos/marcas/ver');
        this.notifier.notify('success', 'Registro agregado...OK!');
      },
      error => {
        console.log(error);
      }
    );
  }

}
