import { Component, Input } from '@angular/core';
import { ApiService } from '../../../servicios/api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  providers : [ApiService]
})
export class MarcasComponent {
  constructor() {
  }
}
