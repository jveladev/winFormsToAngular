import { Component, OnInit } from '@angular/core';
import { ProvinciaService } from '../../../../customized/territorio/provincia/service/provincia.service';

/**
 * Entidad generada Provincia
 * @implements {OnInit}
 */
@Component({
  selector: 'app-generated-provincia',
  templateUrl: './generated-provincia.component.html'
})
export class GeneratedProvinciaComponent implements OnInit {


 constructor(protected provinciaService:ProvinciaService) { }
 
 ngOnInit() {
    if (sessionStorage.getItem("newRoute")) {
      sessionStorage.removeItem("newRoute");
      if (sessionStorage.getItem("provinciaFilter")) {
        sessionStorage.removeItem("provinciaFilter");
      }
      this.provinciaService.clearPageModelData();
    }                   
  } 

}
