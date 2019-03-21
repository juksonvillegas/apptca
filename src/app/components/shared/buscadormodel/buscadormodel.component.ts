import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../../servicios/api.service';
import { isNgTemplate } from '../../../../../node_modules/@angular/compiler';
import { ValueTransformer } from '../../../../../node_modules/@angular/compiler/src/util';

@Component({
  selector: 'app-buscadormodel',
  templateUrl: './buscadormodel.component.html',
})
export class BuscadormodelComponent {
  @Input() modelo = '';
  term = '';
  @Input() params = [];
  datos = [];
  search_complete = '';
  @Output() busquedaEvent = new EventEmitter<any>();
  constructor(private servicio: ApiService) {}
  buscarModel() {
    if (this.term.length >= 2) {
      const split = this.term.split('+');
      this.search_complete = '';
      split.forEach((value, index) => {
        this.search_complete += this.params[index].value + value + '&';
      });
      this.servicio.findDataComplete(this.modelo, this.search_complete).subscribe(
        data => {
          // data results contiene solo el array de datos
          this.datos = data;
          this.busquedaEvent.emit(this.datos);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.datos = [];
      this.busquedaEvent.emit(this.datos);
     }
  }
}
