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
  proveedor = {id: -1, nombre: '', telefono: '', dni: '', mayorista: false,
  proveedor: true, sexo: true, estado: true };
  baseurl = 'proveedores/';
  accion = '';
  term = '';
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
      },
      error => {
        console.log(error);
      }
    );
  }
  buscarClientes = () => {
    if (this.term.length >= 2) {
    this.servicio.findData(this.modelo, '?nombre__icontains=', this.term).subscribe(
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
}
//   buscarClientes = () => {
//   }
//   verCliente = (id) => {
//     this.accion = 'Editar';
//     this.servicio.getCliente(id).subscribe(
//       data => {
//         this.proveedor = data;
//       },
//       error => {
//         console.log(error);
//       }
//     );
//   }
//   seleccionarAccion = () => {
//     if (this.proveedor.id === -1) {
//       this.agregarProveedor();
//     } else { this.actualizarCliente(); }
//   }
//   actualizarCliente = () => {
//     this.servicio.updateCliente(this.proveedor).subscribe(
//       data => {
//         this.proveedor = data;
//         this.listaProveedores();
//         this.notifier.notify('success', 'Proveedor actualizado...OK!');
//       },
//       error => {
//         console.log(error);
//       }
//     );
//   }
//   abrirAgregarProveedor = () => {
//     this.proveedor = {id: -1, nombre: '', telefono: '', dni: '', mayorista: false,
//     proveedor: true, sexo: true, estado: true };
//     this.accion = 'Agregar';
//   }
//   agregarProveedor = () => {
//     this.servicio.crearProveedor(this.proveedor).subscribe(
//       data => {
//         this.listaProveedores();
//         this.notifier.notify('success', 'Proveedor agregado...OK!');
//       },
//       error => {

//       }
//     );
//   }
//   eliminarCliente = () => {
//     this.servicio.eliminarCliente(this.proveedor).subscribe(
//       data => {
//         this.proveedor = data;
//         this.listaProveedores();
//         this.notifier.notify('error', 'Proveedor eliminado...OK!');
//       },
//       error => {
//         console.log(error);
//       }
//     );
//   }
//  }
