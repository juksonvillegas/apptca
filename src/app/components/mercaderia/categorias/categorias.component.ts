import { Component, Input } from '@angular/core';
import { ApiService } from '../../../servicios/api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  providers : [ApiService]
})
export class CategoriasComponent {
  constructor() {
  }
}
