import { Component, OnInit,Output,EventEmitter,ViewChild,ElementRef,TemplateRef,ViewContainerRef,Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {
  GenericDialogComponent,
  ValidationFormService,
  GenericSearchComponent,
  UtilService,
  ToasterService,
  AlertType,
  JnumValidator,
  MODAL_OPTIONS,
  GenericSortDialogComponent,
  Sort,
} from "@jnum/jnum-core";
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageEvent } from "@jnum/jnum-core";
import { ComunidadService } from '../../../../customized/territorio/comunidad/service/comunidad.service';
import { ComunidadFilter } from '../../../../customized/territorio/comunidad/filter/comunidad-filter';
import { Comunidad } from '../../../../customized/territorio/comunidad/model/comunidad';
import { environment } from '../../../../../environments/environment'
import { PageModel } from "@jnum/jnum-core";

/**
 * Búsqueda generada de la entidad Comunidad
 * @implements {OnInit}
 */
@Component( {
    selector: 'app-generated-comunidad-search',
    templateUrl: './generated-comunidad-search.component.html'
} )
export class GeneratedComunidadSearchComponent extends GenericSearchComponent<Comunidad> implements OnInit {


    comunidadFilter: ComunidadFilter = new ComunidadFilter();
  
    constructor(
        public fb: FormBuilder,
        public comunidadService: ComunidadService,
    ) {
        super();
        this.initializeParent();
    }
  
    protected initializeParent() {
        this.searchService = this.comunidadService;
        this.comunidadFilter = JSON.parse(
            sessionStorage.getItem("comunidadFilter") ?? "null"
        );
        if (!this.comunidadFilter) {
            this.comunidadFilter = new ComunidadFilter();
            this.setFiltrosSubcampo();
        }
        this.searchFilter = this.comunidadFilter;
        this.nombreFilter = "comunidadFilter";
        this.nombreEntidad = "comunidad";
    }    

    override ngOnInit() {
    super.ngOnInit();
    }
    setSearchForm(): void {
        this.searchForm = this.fb.group({
      nombreeq: new FormControl( this.comunidadFilter?this.comunidadFilter.nombreeq:null, [] ),
        }
        );
    }

  modifyFilter(comunidadFilter:ComunidadFilter){  
  }
  

    setFiltrosSubcampo(){
    }
  get nombreeq() { return this.searchForm.get( 'nombreeq' ); }
    codigoChange(): void {
        /*Implementación por desarrollador*/
    }


  saveFilter() {
    const idAmbito = JSON.parse(
      sessionStorage.getItem("entity") || "{}"
    )?.idAmbito;    
    localStorage.setItem(
      `customComunidadFilter_${idAmbito}`,
      JSON.stringify(this.searchForm.value)
    );    
  }

  restoreFilter() {
    const idAmbito = JSON.parse(
      sessionStorage.getItem("entity") || "{}"
    )?.idAmbito;
    const customFilter = JSON.parse(
      localStorage.getItem(`customComunidadFilter_${idAmbito}`) ?? "null"
    );
    if (customFilter) {
      this.comunidadFilter = customFilter;
      sessionStorage.setItem("comunidadFilter", JSON.stringify(customFilter));
      this.setSearchForm();
    }
  }  

}
