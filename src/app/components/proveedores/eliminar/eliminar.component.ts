import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
})
export class EliminarComponent {
  constructor(private rutaActiva: ActivatedRoute) {
    console.log(this.rutaActiva.snapshot.params);
  }
}
