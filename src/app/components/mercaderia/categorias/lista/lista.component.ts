import { Component, Input } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ApiService } from '../../../../servicios/api.service';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista.component.html'
})
export class ListaCategoriasComponent {
  modelo = 'categorias/';
  datos = 0;
  @Input() lista = [];
  @Input() data: any = [];
  @Input() next: string;
  @Input() prev: string;
  term = '';
  params = [
    {text: 'Nombre', value: '?nombre__icontains='},
  ];
  private readonly notifier: NotifierService;
  constructor(private servicio: ApiService, notifierService: NotifierService) {
    this.notifier = notifierService;
    this.listaCategorias();
  }
  listaCategorias = () => {
    this.servicio.getData(this.modelo, '').subscribe(
      data => {
        this.lista = data.results;
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
  paginarModelo(modelo, $event) {
    this.data = $event;
    this.lista = this.data.results;
    this.next = this.data.next;
    this.prev = this.data.previous;
  }
  buscar($event) {
    this.data = $event;
    if (this.data.count > 0) {
      this.lista = this.data.results;
      this.data = [];
    } else { this.listaCategorias(); }
  }
}
