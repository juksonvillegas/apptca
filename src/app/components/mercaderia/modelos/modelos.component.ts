import { Component, Input } from '@angular/core';
import { ApiService } from '../../../servicios/api.service';
import { NotifierService } from '../../../../../node_modules/angular-notifier';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  providers : [ApiService]
})
export class ModelosComponent {
  modelo = 'modelos/';
  datos = 0;
  @Input() modelos = [];
  @Input() data: any = [];
  @Input() next: string;
  @Input() prev: string;
  modelo2 = {id: -1, nombre: '', marca: -1, marca_nombre: '', estado: true};
  accion = '';
  term = '';
  params = '?nombre__icontains=';
  private readonly notifier: NotifierService;
  constructor(private servicio: ApiService, notifierService: NotifierService) {
    this.notifier = notifierService;
    this.listaModelos();
  }
  listaModelos = () => {
    this.servicio.getData(this.modelo, '').subscribe(
      data => {
        this.modelos = data.results;
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
}
