import { Component, OnInit } from '@angular/core';
import {ClientesService} from '../clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  providers : [ClientesService]
})
export class ClientesComponent {
  datos = 0;
  clientes = [];
  cliente = [];
  baseurl = 'clientes/';
  accion = '';
  constructor(private servicio: ClientesService ) {
    this.listaClientes();
  }
  listaClientes = () => {
    this.servicio.getClientes().subscribe(
      data => {
        // data results contiene solo el array de datos
        this.clientes = data.results;
        this.datos = data.count;
      },
      error => {
        console.log(error);
      }
    );
  }
  verCliente = (id) => {
    this.accion = 'Editar';
    this.servicio.getCliente(id).subscribe(
      data => {
        this.cliente = data;
        console.log(this.cliente);
      },
      error => {
        console.log(error);
      }
    );
  }
  agregarCliente = () => {
    this.accion = 'Agregar';
    this.cliente = [];
  }
}
