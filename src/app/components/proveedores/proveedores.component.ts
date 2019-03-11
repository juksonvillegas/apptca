import { Component, OnInit } from '@angular/core';
import {ClientesService} from '../clientes/clientes.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html'
})
export class ProveedoresComponent {
  datos = 0;
  proveedores = [];
  proveedor = {id: -1, nombre: '', telefono: '', dni: '', mayorista: false,
  proveedor: true, sexo: true, estado: true };
  baseurl = 'proveedores/';
  accion = '';
  term = '';
  private readonly notifier: NotifierService;
  constructor(private servicio: ClientesService, notifierService: NotifierService) {
    this.notifier = notifierService;
    this.listaProveedores();
  }
  listaProveedores = () => {
    this.servicio.getProveedores().subscribe(
      data => {
        // data results contiene solo el array de datos
        this.proveedores = data.results;
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
          this.proveedores = [];
          this.proveedores = data.results;
          this.datos = data.count;
        },
        error => {
          console.log(error);
        }
      );
    } else {this.listaProveedores(); }
  }
  verCliente = (id) => {
    this.accion = 'Editar';
    this.servicio.getCliente(id).subscribe(
      data => {
        this.proveedor = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  seleccionarAccion = () => {
    if (this.proveedor.id === -1) {
      this.agregarProveedor();
    } else { this.actualizarCliente(); }
  }
  actualizarCliente = () => {
    this.servicio.updateCliente(this.proveedor).subscribe(
      data => {
        this.proveedor = data;
        this.listaProveedores();
        this.notifier.notify('success', 'Proveedor actualizado...OK!');
      },
      error => {
        console.log(error);
      }
    );
  }
  abrirAgregarProveedor = () => {
    this.proveedor = {id: -1, nombre: '', telefono: '', dni: '', mayorista: false,
    proveedor: true, sexo: true, estado: true };
    this.accion = 'Agregar';
  }
  agregarProveedor = () => {
    this.servicio.crearProveedor(this.proveedor).subscribe(
      data => {
        this.listaProveedores();
        this.notifier.notify('success', 'Proveedor agregado...OK!');
      },
      error => {

      }
    );
  }
  eliminarCliente = () => {
    this.servicio.eliminarCliente(this.proveedor).subscribe(
      data => {
        this.proveedor = data;
        this.listaProveedores();
        this.notifier.notify('error', 'Proveedor eliminado...OK!');
      },
      error => {
        console.log(error);
      }
    );
  }
}
