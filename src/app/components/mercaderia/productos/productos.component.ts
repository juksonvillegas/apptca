import { Component, Input } from '@angular/core';
import { ApiService } from '../../../servicios/api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  providers : [ApiService]
})
export class ProductosComponent {
  modelo = 'productos/';
  modelomodelos = 'modelos/';
  modelocategorias = 'categorias/';
  modeloprecios = 'precios/';
  producto = {id: -1, nombre: '', modelo: -1, modelo_nombre: '' , marca_nombre: '',
  categoria: -1, categoria_nombre: '', precio: -1, precio_unitario: 0, precio_punto: 0,
  precio_docena: 0, estado: true};
  datos = 0;
  modelos = [];
  precios = [];
  categorias = [];
  @Input() productos = [];
  @Input() data: any = [];
  @Input() next: string;
  @Input() prev: string;
  accion = '';
  term = '';
  params = '?nombre__icontains=';
  modelo_search = '';
  categoria_search = '';
  precio_search = '';
  modelomodelo = {id: -1, nombre: '', marca: -1, marca_nombre: ''};
  categoria = {id: -1, nombre: ''};
  precio = {id: -1, nombre: '', precio_unitario: 0, precio_punto: 0, precio_docena: 0 };
  private readonly notifier: NotifierService;
  constructor(private servicio: ApiService, notifierService: NotifierService) {
    this.notifier = notifierService;
    this.listaProductos();
    this.listaCategorias();
  }
  listaProductos = () => {
    this.servicio.getData(this.modelo, '').subscribe(
      data => {
        this.productos = data.results;
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
  buscarCategorias = () => {
    if (this.categoria_search.length >= 2) {
      this.servicio.findData(this.modelocategorias, this.params, this.categoria_search).subscribe(
        data => {
          // data results contiene solo el array de datos
          this.categorias = [];
          this.categorias = data.results;
          this.datos = data.count;
        },
        error => {
          console.log(error);
        }
      );
    } else {this.listaCategorias(); }
  }
  pasarCategoria(event: Event) {
    const seleccionado = event.target['options'];
    const itemseleccionado = seleccionado.selectedIndex;
    const valor = seleccionado[itemseleccionado].value;
    const texto = seleccionado[itemseleccionado].text;
    this.producto.categoria = valor;
    this.producto.categoria_nombre = texto;
  }
  listaModelos = () => {
    this.servicio.getData(this.modelomodelos, '').subscribe(
      data => {
        this.modelos = data.results;
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
  listaCategorias = () => {
    this.servicio.getData(this.modelocategorias, '').subscribe(
      data => {
        this.categorias = data.results;
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
  listaPrecios = () => {
    this.servicio.getData(this.modeloprecios, '').subscribe(
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
  abrirAgregarProducto = () => {
    this.producto = {id: -1, nombre: '', modelo: -1, modelo_nombre: '' , marca_nombre: '',
      categoria: -1, categoria_nombre: '', precio: -1, precio_unitario: 0, precio_punto: 0,
      precio_docena: 0, estado: true};
    this.accion = 'Agregar';
  }
  agregarProducto = () => {
    this.servicio.addData(this.modelo, this.producto).subscribe(
    data => {
      this.listaProductos();
      this.notifier.notify('success', 'Produto agregado...OK!');
    },
    error => {
      console.log(error);
    }
    );
  }
  actualizarProducto = () => {
    this.servicio.updateData(this.modelo, this.producto).subscribe(
      data => {
        this.modelomodelo = data;
        this.listaProductos();
        this.notifier.notify('success', 'Producto actualizado...OK!');
      },
      error => {
        console.log(error);
      }
    );
  }
  seleccionarAccion = () => {
    if (this.modelomodelo.id === -1) {
      this.agregarProducto();
    } else { this.actualizarProducto(); }
  }
  paginarModelo(modelo, $event) {
    this.data = $event;
    this.productos = this.data.results;
    this.next = this.data.next;
    this.prev = this.data.previous;
  }
}
