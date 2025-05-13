import { Component, OnInit } from '@angular/core';
import { ConsuladoService } from '../../../../customized/territorio/consulado/service/consulado.service';

/**
 * Entidad generada Consulado
 * @implements {OnInit}
 */
@Component({
  selector: 'app-generated-consulado',
  templateUrl: './generated-consulado.component.html'
})
export class GeneratedConsuladoComponent implements OnInit {


 constructor(protected consuladoService:ConsuladoService) { }
 
 ngOnInit() {
    if (sessionStorage.getItem("newRoute")) {
      sessionStorage.removeItem("newRoute");
      if (sessionStorage.getItem("consuladoFilter")) {
        sessionStorage.removeItem("consuladoFilter");
      }
      this.consuladoService.clearPageModelData();
    }                   
  } 

}
