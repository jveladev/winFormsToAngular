import { Component, OnInit,ViewChild} from '@angular/core';
import { GenericListWrapperComponent,NavigationService } from "@jnum/jnum-core";
import { Router } from '@angular/router';

/**
 * List wrapper generado de la entidad Consulado
 * @implements {OnInit}
 */
@Component( {
    selector: 'app-generated-consulado-list-wrapper',
    templateUrl: './generated-consulado-list-wrapper.component.html',
} )
export class GeneratedConsuladoListWrapperComponent extends GenericListWrapperComponent implements OnInit {
  showGoToPrevious:boolean=false;
  botoneraClass: string = "";
  listClass: string = "";
  searchClass: string = "";
  
  constructor(protected readonly router: Router,protected navigationService: NavigationService) {
    super();
    this.wrapperTitle = `${this.translate.instant('consulado.wrapperTitle')}`;
  }    
  goToPrevious(){
          this.router.navigateByUrl(this.navigationService.getPreviousUrl());
  }
  
  ngOnInit() {
  }

}