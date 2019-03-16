import { Component, Input } from '@angular/core';
import {ClientesService} from '../clientes.service';
import {ApiService} from '../../../servicios/api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  providers : [ApiService]
})
export class ClientesComponent {
  modelo = 'clientes/';
  datos = 0;
  @Input() clientes = [];
  @Input() data: any = [];
  @Input() next: string;
  @Input() prev: string;
  cliente = {id: -1, nombre: '', telefono: '', dni: '', mayorista: false,
  proveedor: false, sexo: true, estado: true };
  accion = '';
  term = '';
  params = '?nombre__icontains=';
  private readonly notifier: NotifierService;
  constructor(private servicio: ApiService, notifierService: NotifierService) {
    this.notifier = notifierService;
    this.listaClientes();
  }
  listaClientes = () => {
    this.servicio.getData(this.modelo, '').subscribe(
      data => {
        this.clientes = data.results;
        this.datos = data.count;
        const a = data.next.split('/');
        this.next = a[4];
        this.prev = data.previous;
      },
      error => {
        console.log(error);
      }
    );
  }
  buscarClientes = () => {
    if (this.term.length >= 2) {
      this.servicio.findData(this.modelo, this.params, this.term).subscribe(
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
    this.servicio.getDataId(this.modelo, id).subscribe(
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
    this.servicio.updateData(this.modelo, this.cliente).subscribe(
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
    this.servicio.addData(this.modelo, this.cliente).subscribe(
      data => {
        this.listaClientes();
        this.notifier.notify('success', 'Cliente agregado...OK!');
      },
      error => {
        console.log(error);
      }
    );
  }
  eliminarCliente = () => {
    this.cliente.estado = false;
    this.servicio.deleteData(this.modelo, this.cliente).subscribe(
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
  /*recibirClientes($event) {
    this.data = $event;
    this.clientes = this.data.results;
    this.next = this.data.next;
    this.prev = this.data.previous;
  }*/
  paginarModelo(modelo, $event) {
    this.data = $event;
    this.clientes = this.data.results;
    this.next = this.data.next;
    this.prev = this.data.previous;
  }
}
