import { Component, OnInit,ViewChild} from '@angular/core';
import { GenericListWrapperComponent,NavigationService } from "@jnum/jnum-core";
import { Router } from '@angular/router';

/**
 * List wrapper generado de la entidad Comunidad
 * @implements {OnInit}
 */
@Component( {
    selector: 'app-generated-comunidad-list-wrapper',
    templateUrl: './generated-comunidad-list-wrapper.component.html',
} )
export class GeneratedComunidadListWrapperComponent extends GenericListWrapperComponent implements OnInit {
  showGoToPrevious:boolean=false;
  botoneraClass: string = "";
  listClass: string = "";
  searchClass: string = "";
  
  constructor(protected readonly router: Router,protected navigationService: NavigationService) {
    super();
    this.wrapperTitle = `${this.translate.instant('comunidad.wrapperTitle')}`;
  }    
  goToPrevious(){
          this.router.navigateByUrl(this.navigationService.getPreviousUrl());
  }
  
  ngOnInit() {
  }

}