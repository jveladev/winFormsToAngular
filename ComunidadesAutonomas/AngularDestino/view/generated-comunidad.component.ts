import { Component, OnInit } from '@angular/core';
import { ComunidadService } from '../../../../customized/territorio/comunidad/service/comunidad.service';

/**
 * Entidad generada Comunidad
 * @implements {OnInit}
 */
@Component({
  selector: 'app-generated-comunidad',
  templateUrl: './generated-comunidad.component.html'
})
export class GeneratedComunidadComponent implements OnInit {


 constructor(protected comunidadService:ComunidadService) { }
 
 ngOnInit() {
    if (sessionStorage.getItem("newRoute")) {
      sessionStorage.removeItem("newRoute");
      if (sessionStorage.getItem("comunidadFilter")) {
        sessionStorage.removeItem("comunidadFilter");
      }
      this.comunidadService.clearPageModelData();
    }                   
  } 

}
