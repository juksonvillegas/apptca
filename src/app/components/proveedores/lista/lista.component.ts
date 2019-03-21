import { Component, Input } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ApiService } from '../../../servicios/api.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  providers : [ApiService]
})
export class ListaComponent {
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
  params = [
    {text: 'Nombre', value: '?nombre__icontains='},
    {text: 'DNI', value: '?dni__icontains='},
    {text: 'Telefono', value: '?telefono__icontains='}
  ];
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
  buscarClientes = () => {
    if (this.term.length >= 2) {
    this.servicio.findData(this.modelo, this.params[0].value, this.term).subscribe(
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
  paginarModelo(modelo, $event) {
    this.data = $event;
    this.proveedores = this.data.results;
    this.next = this.data.next;
    this.prev = this.data.previous;
  }
  buscar($event) {
    this.data = $event;
    if (this.data.count > 0) {
      this.proveedores = this.data.results;
      this.data = [];
    } else { this.listaProveedores(); }
  }
}
