import { Component, Input } from '@angular/core';
import { ApiService } from '../../../servicios/api.service';
import { NotifierService } from '../../../../../node_modules/angular-notifier';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  providers : [ApiService]
})
export class CategoriasComponent {
  modelo = 'categorias/';
  datos = 0;
  @Input() categorias = [];
  @Input() data: any = [];
  @Input() next: string;
  @Input() prev: string;
  categoria = {id: -1, nombre: '', estado: true};
  accion = '';
  term = '';
  params = '?nombre__icontains=';
  private readonly notifier: NotifierService;
  constructor(private servicio: ApiService, notifierService: NotifierService) {
    this.notifier = notifierService;
    this.listaCategorias();
  }
  listaCategorias = () => {
    this.servicio.getData(this.modelo, '').subscribe(
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
  buscarCategorias = () => {
    if (this.term.length >= 2) {
      this.servicio.findData(this.modelo, this.params, this.term).subscribe(
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
  verCategoria = (id) => {
    this.accion = 'Editar';
    this.servicio.getDataId(this.modelo, id).subscribe(
      data => {
        this.categoria = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  seleccionarAccion = () => {
    if (this.categoria.id === -1) {
      this.agregarCategoria();
    } else { this.actualizarCategoria(); }
  }
  actualizarCategoria = () => {
    this.servicio.updateData(this.modelo, this.categoria).subscribe(
      data => {
        this.categoria = data;
        this.listaCategorias();
        this.notifier.notify('success', 'Categoria actualizada...OK!');
      },
      error => {
        console.log(error);
      }
    );
  }
  abrirAgregarCategoria = () => {
    this.categoria = {id: -1, nombre: '', estado: true};
    this.accion = 'Agregar';
  }
  agregarCategoria = () => {
    this.servicio.addData(this.modelo, this.categoria).subscribe(
      data => {
        this.listaCategorias();
        this.notifier.notify('success', 'Categorias agregada...OK!');
      },
      error => {
        console.log(error);
      }
    );
  }
  eliminarCategoria = () => {
    this.categoria.estado = false;
    this.servicio.deleteData(this.modelo, this.categoria).subscribe(
      data => {
        this.categoria = data;
        this.listaCategorias();
        this.notifier.notify('error', 'Categoria eliminada...OK!');
      },
      error => {
        console.log(error);
      }
    );
  }
  paginarModelo(modelo, $event) {
    this.data = $event;
    this.categorias = this.data.results;
    this.next = this.data.next;
    this.prev = this.data.previous;
  }
}
