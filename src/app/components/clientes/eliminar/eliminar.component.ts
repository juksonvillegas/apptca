import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../servicios/api.service';


@Component({
  selector: 'app-eliminar-clientes',
  templateUrl: './eliminar.component.html',
  providers : [ApiService]
})
export class ClientesEliminarComponent {
  modelo = 'clientes/';
  id = '';
  dato = [];
  constructor(private servicio: ApiService, private rutaActiva: ActivatedRoute) {
    this.verDato();
    }
    verDato() {
    this.id = this.rutaActiva.snapshot.params.id;
    this.servicio.getDataId(this.modelo, this.id).subscribe(
      data => {
        this.dato = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
