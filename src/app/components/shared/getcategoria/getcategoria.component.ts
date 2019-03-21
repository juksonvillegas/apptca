import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../../servicios/api.service';

@Component({
  selector: 'app-getcategoria',
  templateUrl: './getcategoria.component.html'
})
export class GetcategoriaComponent {
  data = { model_id: -1, model_name: '' };
  search = '';
  datos = [];
  @Input() modelo = 'categorias/';
  @Input() name = 'categorias';
  @Output() modelEvent = new EventEmitter<any>();
  params = '?nombre__icontains=';
  constructor(private servicio: ApiService) {
    this.listaModel();
  }
  listaModel = () => {
    this.servicio.getData(this.modelo, '').subscribe(
      data => {
        this.datos = data.results;
      },
      error => {
        console.log(error);
      }
    );
  }
  getModel() {
    this.servicio.findData(this.modelo, this.params, this.search).subscribe(
      data => {
        this.datos = data.results;
      },
      error => { console.log(error); }
    );
  }
  pasarModel(event: Event) {
    const seleccionado = event.target['options'];
    const itemseleccionado = seleccionado.selectedIndex;
    const valor = seleccionado[itemseleccionado].value;
    const texto = seleccionado[itemseleccionado].text;
    this.data.model_id = valor;
    this.data.model_name = texto;
    this.modelEvent.emit(this.data);
  }
  noModel() {
    this.data.model_id = -1;
    this.data.model_name = '';
  }
}
