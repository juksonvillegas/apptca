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
  modelomarcas = 'marcas/';
  modelomodelo = {id: -1, nombre: '', extendido: '', marca: -1, marca_nombre: '', estado: true};
  datos = 0;
  marcas = [];
  @Input() modelos = [];
  @Input() data: any = [];
  @Input() next: string;
  @Input() prev: string;
  accion = '';
  term = '';
  params = '?nombre__icontains=';
  marca_search = '';
  marca = {id: -1, nombre: ''};
  private readonly notifier: NotifierService;
  constructor(private servicio: ApiService, notifierService: NotifierService) {
    this.notifier = notifierService;
    this.listaModelos();
    this.listaMarcas();
  }
  listaMarcas = () => {
    this.servicio.getData(this.modelomarcas, '').subscribe(
      data => {
        this.marcas = data.results;
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
  listaModelos = () => {
    this.servicio.getData(this.modelo, '').subscribe(
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
  buscarMarcas = () => {
    if (this.marca_search.length >= 2) {
      this.servicio.findData(this.modelomarcas, this.params, this.marca_search).subscribe(
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
  buscarModelos = () => {
    if (this.term.length >= 2) {
      console.log(this.modelo + this.params + this.term);
      this.servicio.findData(this.modelo, this.params, this.term).subscribe(
        data => {
          // data results contiene solo el array de datos
          this.modelos = [];
          this.modelos = data.results;
          this.datos = data.count;
        },
        error => {
          console.log(error);
        }
      );
    } else {this.listaModelos(); }
  }
  verModelo = (id) => {
    this.accion = 'Editar';
    this.servicio.getDataId(this.modelo, id).subscribe(
      data => {
        this.modelomodelo = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  seleccionarAccion = () => {
    if (this.modelomodelo.id === -1) {
      this.agregarModelo();
    } else { this.actualizarModelo(); }
  }
  actualizarModelo = () => {
    this.servicio.updateData(this.modelo, this.modelomodelo).subscribe(
      data => {
        this.modelomodelo = data;
        this.listaModelos();
        this.notifier.notify('success', 'Marca actualizada...OK!');
      },
      error => {
        console.log(error);
      }
    );
  }
  abrirAgregarModelo = () => {
    this.modelomodelo = {id: -1, nombre: '', extendido: '', marca: -1, marca_nombre: '', estado: true};
    this.accion = 'Agregar';
  }
  agregarModelo = () => {
    this.servicio.addData(this.modelo, this.modelomodelo).subscribe(
    data => {
      this.listaModelos();
      this.notifier.notify('success', 'Modelo agregado...OK!');
    },
    error => {
      console.log(error);
    }
    );
  }
  eliminarModelo = () => {
    this.modelomodelo.estado = false;
    this.servicio.deleteData(this.modelo, this.modelomodelo).subscribe(
      data => {
        this.modelomodelo = data;
        this.listaMarcas();
        this.notifier.notify('error', 'Modelo eliminado...OK!');
      },
      error => {
        console.log(error);
      }
    );
  }
  paginarModelo(modelo, $event) {
    this.data = $event;
    this.modelos = this.data.results;
    this.next = this.data.next;
    this.prev = this.data.previous;
  }
  noMarca() {
    this.modelomodelo.marca = -1;
    this.modelomodelo.marca_nombre = '';
  }
  pasarMarca(event: Event) {
    const seleccionado = event.target['options'];
    const itemseleccionado = seleccionado.selectedIndex;
    const valor = seleccionado[itemseleccionado].value;
    const texto = seleccionado[itemseleccionado].text;
    this.modelomodelo.marca = valor;
    this.modelomodelo.marca_nombre = texto;
  }
}
