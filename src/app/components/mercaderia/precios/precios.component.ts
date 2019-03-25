import { Component, Input } from '@angular/core';
import { ApiService } from '../../../servicios/api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  providers : [ApiService]
})
export class PreciosComponent  {
  modelo = 'precios/';
  datos = 0;
  @Input() precios = [];
  @Input() data: any = [];
  @Input() next: string;
  @Input() prev: string;
  precio = {id: -1, nombre: '', unitario: 0.00, punto: 0.00, docena: 0.00, estado: true};
  accion = '';
  term = '';
  params = '?nombre__icontains=';
  private readonly notifier: NotifierService;
  constructor(private servicio: ApiService, notifierService: NotifierService) {
    this.notifier = notifierService;
    this.listaPrecios();
  }
  listaPrecios = () => {
    this.servicio.getData(this.modelo, '').subscribe(
      data => {
        this.precios = data.results;
        this.datos = data.count;
        if (data.next) {
          const a = data.next.split('/');
          this.next = a[4];
          this.prev = data.previous;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  buscarPrecios = () => {
    if (this.term.length >= 2) {
      this.servicio.findData(this.modelo, this.params, this.term).subscribe(
        data => {
          // data results contiene solo el array de datos
          this.precios = [];
          this.precios = data.results;
          this.datos = data.count;
        },
        error => {
          console.log(error);
        }
      );
    } else {this.listaPrecios(); }
  }
  verPrecio = (id) => {
    this.accion = 'Editar';
    this.servicio.getDataId(this.modelo, id).subscribe(
      data => {
        this.precio = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  seleccionarAccion = () => {
    if (this.precio.id === -1) {
      this.agregarPrecio();
    } else { this.actualizarPrecio(); }
  }
  actualizarPrecio = () => {
    this.servicio.updateData(this.modelo, this.precio).subscribe(
      data => {
        this.precio = data;
        this.listaPrecios();
        this.notifier.notify('success', 'Precio actualizado...OK!');
      },
      error => {
        console.log(error);
      }
    );
  }
  abrirAgregarPrecio = () => {
    this.precio = {id: -1, nombre: '', unitario: 0.00, punto: 0.00, docena: 0.00, estado: true};
    this.accion = 'Agregar';
  }
  agregarPrecio = () => {
    this.servicio.addData(this.modelo, this.precio).subscribe(
      data => {
        this.listaPrecios();
        this.notifier.notify('success', 'Precio agregado...OK!');
      },
      error => {
        console.log(error);
      }
    );
  }
  eliminarPrecio = () => {
    this.precio.estado = false;
    this.servicio.deleteData(this.modelo, this.precio).subscribe(
      data => {
        this.precio = data;
        this.listaPrecios();
        this.notifier.notify('error', 'Precio eliminado...OK!');
      },
      error => {
        console.log(error);
      }
    );
  }
  paginarModelo(modelo, $event) {
    this.data = $event;
    this.precios = this.data.results;
    this.next = this.data.next;
    this.prev = this.data.previous;
  }
}
