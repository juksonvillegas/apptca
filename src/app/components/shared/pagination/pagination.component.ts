import { Component, Input, Output, EventEmitter } from '@angular/core';
import {ClientesService} from '../../clientes/clientes.service';
import {ApiService} from '../../../servicios/api.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() prev: string;
  @Input() next: string;
  @Input() modelo: string;
  clientes = [];
  datos = [];
  @Output() paginationEvent = new EventEmitter<any>();
  constructor(private servicio: ApiService) {
  }
  paginarModelo(modelo: string, ruta: string) {
    let valor: string;
    if (ruta) {
      if (ruta.length > 9) {
        const c = ruta.split('/');
        valor = c[4];
      } else { valor = ruta; }
    }
    this.servicio.getData(modelo, valor).subscribe(
      data => {
        this.datos = data.results;
        this.paginationEvent.emit(data);
      },
      error => { console.log(error); }
    );
  }
}
