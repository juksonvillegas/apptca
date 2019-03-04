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
  term = '';
  private readonly notifier: NotifierService;
  constructor(private servicio: ClientesService, notifierService: NotifierService) {
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
  buscarClientes = () => {
    if (this.term.length >= 2) {
      this.servicio.buscarCliente(this.term).subscribe(
        data => {
          // data results contiene solo el array de datos
          this.clientes = [];
          this.clientes = data.results;
          this.datos = data.count;
        },
        error => {
          console.log(error);
        }
      );
    } else {this.listaClientes(); }
  }
  verCliente = (id) => {
    this.accion = 'Editar';
    this.servicio.getCliente(id).subscribe(
      data => {
        this.cliente = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  seleccionarAccion = () => {
    if (this.cliente.id === -1) {
      this.agregarCliente();
    } else { this.actualizarCliente(); }
  }
  actualizarCliente = () => {
    this.servicio.updateCliente(this.cliente).subscribe(
      data => {
        this.cliente = data;
        this.listaClientes();
        this.notifier.notify('success', 'Cliente actualizado...OK!');
      },
      error => {
        console.log(error);
      }
    );
  }
  abrirAgregarCliente = () => {
    this.cliente = {id: -1, nombre: '', telefono: '', dni: '', mayorista: false,
    proveedor: false, sexo: true, estado: true };
    this.accion = 'Agregar';
  }
  agregarCliente = () => {
    this.servicio.crearCliente(this.cliente).subscribe(
      data => {
        this.listaClientes();
        this.notifier.notify('success', 'Cliente agregado...OK!');
      },
      error => {

      }
    );
  }
  eliminarCliente = () => {
    this.servicio.eliminarCliente(this.cliente).subscribe(
      data => {
        this.cliente = data;
        this.listaClientes();
        this.notifier.notify('error', 'Cliente eliminado...OK!');
      },
      error => {
        console.log(error);
      }
    );
  }
}
