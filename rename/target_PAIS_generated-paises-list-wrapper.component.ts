import { Component, OnInit,ViewChild} from '@angular/core';
import { GenericListWrapperComponent,NavigationService } from "@jnum/jnum-core";
import { Router } from '@angular/router';

/**
 * List wrapper generado de la entidad Paises
 * @implements {OnInit}
 */
@Component( {
    selector: 'app-generated-paises-list-wrapper',
    templateUrl: './generated-paises-list-wrapper.component.html',
} )
export class GeneratedPaisesListWrapperComponent extends GenericListWrapperComponent implements OnInit {
  showGoToPrevious:boolean=false;
  botoneraClass: string = "";
  listClass: string = "";
  searchClass: string = "";
  
  constructor(protected readonly router: Router,protected navigationService: NavigationService) {
    super();
    this.wrapperTitle = `${this.translate.instant('paises.wrapperTitle')}`;
  }    
  goToPrevious(){
          this.router.navigateByUrl(this.navigationService.getPreviousUrl());
  }
  
  ngOnInit() {
  }

}