import { Component, Input, Output, EventEmitter } from '@angular/core';
import {ClientesService} from '../../clientes/clientes.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() prev: string;
  @Input() next: string;
  clientes = [];
  @Output() clientesevent = new EventEmitter<any>();
  constructor(private servicio: ClientesService) {
  }
  enviarClientes(ruta) {
    console.log('la ruta es' + ruta);
    let valor: string;
    if (ruta) {
      if (ruta.length > 9) {
        let c = ruta.split('/');
        valor = c[4];
      } else {
        valor = ruta;
      }
    }
    this.servicio.getClientesPag(valor).subscribe(
      data => {
        this.clientes = data.results;
        this.clientesevent.emit(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
