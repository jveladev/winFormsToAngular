import { Component, OnInit } from '@angular/core';
import { MunicipiosService } from '../../../../customized/territorio/municipios/service/municipios.service';

/**
 * Entidad generada Municipios
 * @implements {OnInit}
 */
@Component({
  selector: 'app-generated-municipios',
  templateUrl: './generated-municipios.component.html'
})
export class GeneratedMunicipiosComponent implements OnInit {


 constructor(protected municipiosService:MunicipiosService) { }
 
 ngOnInit() {
    if (sessionStorage.getItem("newRoute")) {
      sessionStorage.removeItem("newRoute");
      if (sessionStorage.getItem("municipiosFilter")) {
        sessionStorage.removeItem("municipiosFilter");
      }
      this.municipiosService.clearPageModelData();
    }                   
  } 

}
