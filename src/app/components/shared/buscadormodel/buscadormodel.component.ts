import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../../servicios/api.service';
import { isNgTemplate } from '@angular/compiler';
import { ValueTransformer } from '@angular/compiler/src/util';

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
  selected = '?nombre__icontains=';
  @Output() busquedaEvent = new EventEmitter<any>();
  constructor(private servicio: ApiService) {}
  buscarModel() {
    if (this.term.length >= 2) {
      const split = this.term.split('+');
      if (split.length > 1) {
        this.search_complete = '';
        split.forEach((value, index) => {
          this.search_complete += this.params[index].value + value + '&';
        });
      } else {
        this.search_complete = this.selected + this.term;
      }
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
