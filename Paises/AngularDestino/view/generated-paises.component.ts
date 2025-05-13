import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../../../../customized/territorio/paises/service/paises.service';

/**
 * Entidad generada Paises
 * @implements {OnInit}
 */
@Component({
  selector: 'app-generated-paises',
  templateUrl: './generated-paises.component.html'
})
export class GeneratedPaisesComponent implements OnInit {


 constructor(protected paisesService:PaisesService) { }
 
 ngOnInit() {
    if (sessionStorage.getItem("newRoute")) {
      sessionStorage.removeItem("newRoute");
      if (sessionStorage.getItem("paisesFilter")) {
        sessionStorage.removeItem("paisesFilter");
      }
      this.paisesService.clearPageModelData();
    }                   
  } 

}
