import { Component, Input } from '@angular/core';
import { ApiService } from '../../../servicios/api.service';
import { NotifierService } from '../../../../../node_modules/angular-notifier';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  providers : [ApiService]
})
export class MarcasComponent {
  modelo = 'marcas/';
  datos = 0;
  @Input() marcas = [];
  @Input() data: any = [];
  @Input() next: string;
  @Input() prev: string;
  marca = {id: -1, nombre: '', estado: true};
  accion = '';
  term = '';
  params = '?nombre__icontains=';
  private readonly notifier: NotifierService;
  constructor(private servicio: ApiService, notifierService: NotifierService) {
    this.notifier = notifierService;
    this.listaMarcas();
  }
  listaMarcas = () => {
    this.servicio.getData(this.modelo, '').subscribe(
      data => {
        this.marcas = data.results;
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
  buscarMarcas = () => {
    if (this.term.length >= 2) {
      this.servicio.findData(this.modelo, this.params, this.term).subscribe(
        data => {
          // data results contiene solo el array de datos
          this.marcas = [];
          this.marcas = data.results;
          this.datos = data.count;
        },
        error => {
          console.log(error);
        }
      );
    } else {this.listaMarcas(); }
  }
  verMarca = (id) => {
    this.accion = 'Editar';
    this.servicio.getDataId(this.modelo, id).subscribe(
      data => {
        this.marca = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  seleccionarAccion = () => {
    if (this.marca.id === -1) {
      this.agregarMarca();
    } else { this.actualizarMarca(); }
  }
  actualizarMarca = () => {
    this.servicio.updateData(this.modelo, this.marca).subscribe(
      data => {
        this.marca = data;
        this.listaMarcas();
        this.notifier.notify('success', 'Marca actualizada...OK!');
      },
      error => {
        console.log(error);
      }
    );
  }
  abrirAgregarMarca = () => {
    this.marca = {id: -1, nombre: '', estado: true};
    this.accion = 'Agregar';
  }
  agregarMarca = () => {
    this.servicio.addData(this.modelo, this.marca).subscribe(
      data => {
        this.listaMarcas();
        this.notifier.notify('success', 'Marca agregada...OK!');
      },
      error => {
        console.log(error);
      }
    );
  }
  eliminarMarca = () => {
    this.marca.estado = false;
    this.servicio.deleteData(this.modelo, this.marca).subscribe(
      data => {
        this.marca = data;
        this.listaMarcas();
        this.notifier.notify('error', 'Marca eliminada...OK!');
      },
      error => {
        console.log(error);
      }
    );
  }
  paginarModelo(modelo, $event) {
    this.data = $event;
    this.marca = this.data.results;
    this.next = this.data.next;
    this.prev = this.data.previous;
  }
}
