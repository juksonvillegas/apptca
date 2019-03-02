import { Component, OnInit } from '@angular/core';
import {ClientesService} from '../clientes.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  providers : [ClientesService]
})
export class ClientesComponent {
  datos = 0;
  clientes = [];
  cliente = {id: -1, nombre: '', telefono: '', dni: '', mayorista: false,
  proveedor: false, sexo: true, estado: true };
  baseurl = 'clientes/';
  accion = '';
  private readonly notifier: NotifierService;
  constructor(private servicio: ClientesService , notifierService: NotifierService) {
    this.notifier = notifierService;
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
  actualizarCliente = () => {
    this.servicio.updateCliente(this.cliente).subscribe(
      data => {
        this.cliente = data;
        this.listaClientes();
        this.notifier.notify( 'success', 'Datos guardados correctamente' );
      },
      error => {
        console.log(error);
      }
    );
  }
  agregarCliente = () => {
    this.accion = 'Agregar';
    // this.cliente = [];
  }
}
