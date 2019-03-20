import { Component, Input } from '@angular/core';
import { ApiService } from '../../../servicios/api.service';
import { NotifierService } from '../../../../../node_modules/angular-notifier';

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
  marca_search = '';
  modelomodelo = {id: -1, nombre: '', marca: -1, marca_nombre: ''};
  categoria = {id: -1, nombre: ''};
  precio = {id: -1, nombre: '', precio_unitario: 0, precio_punto: 0, precio_docena: 0 };
  private readonly notifier: NotifierService;
  constructor() { }

}
