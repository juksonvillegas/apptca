import { Component, Input } from '@angular/core';
import {ApiService} from '../../servicios/api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html'
})
export class ProveedoresComponent {
  modelo = 'proveedores/';
  datos = 0;
  @Input() proveedores = [];
  @Input() data: any = [];
  @Input() next: string;
  @Input() prev: string;
  proveedor = {id: -1, nombre: '', telefono: '', dni: '', mayorista: false,
  proveedor: true, sexo: true, estado: true };
  accion = '';
  term = '';
  params = '?nombre__icontains=';
  private readonly notifier: NotifierService;
  constructor(private servicio: ApiService, notifierService: NotifierService) {
    this.notifier = notifierService;
    this.listaProveedores();
  }
  listaProveedores = () => {
    this.servicio.getData(this.modelo, '').subscribe(
      data => {
        this.proveedores = data.results;
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
  seleccionarAccion = () => {
    if (this.proveedor.id === -1) {
      this.agregarProveedor();
    } else { this.actualizarProveedor(); }
  }
  actualizarProveedor = () => {
    this.servicio.updateData(this.modelo, this.proveedor).subscribe(
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
  verProveedor = (id) => {
    this.accion = 'Editar';
    this.servicio.getDataId(this.modelo, id).subscribe(
      data => {
        this.proveedor = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  agregarProveedor = () => {
    this.servicio.addData(this.modelo, this.proveedor).subscribe(
      data => {
        this.listaProveedores();
        this.notifier.notify('success', 'Proveedor agregado...OK!');
      },
      error => {
        console.log(error);
      }
    );
  }
  eliminarProveedor = () => {
    this.servicio.deleteData(this.modelo, this.proveedor).subscribe(
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
  paginarModelo(modelo, $event) {
    this.data = $event;
    this.proveedores = this.data.results;
    this.next = this.data.next;
    this.prev = this.data.previous;
  }
}
