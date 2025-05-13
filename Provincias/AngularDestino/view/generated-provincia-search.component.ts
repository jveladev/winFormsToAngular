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
import { ProvinciaService } from '../../../../customized/territorio/provincia/service/provincia.service';
import { ProvinciaFilter } from '../../../../customized/territorio/provincia/filter/provincia-filter';
import { Provincia } from '../../../../customized/territorio/provincia/model/provincia';
import { environment } from '../../../../../environments/environment'
import { PageModel } from "@jnum/jnum-core";
import { Comunidad } from '../../../../customized/territorio/comunidad/model/comunidad';
import { ComunidadService } from '../../../../customized/territorio/comunidad/service/comunidad.service';
import { ComunidadPropSelectComponent } from '../../../../customized/territorio/comunidad/view/comunidad-prop-select.component';
import { ComunidadFilter } from '../../../../customized/territorio/comunidad/filter/comunidad-filter';
import { ComunidadNewComponent } from '../../../../customized/territorio/comunidad/view/comunidad-new.component';
import { ComunidadEditComponent } from '../../../../customized/territorio/comunidad/view/comunidad-edit.component';

/**
 * Búsqueda generada de la entidad Provincia
 * @implements {OnInit}
 */
@Component( {
    selector: 'app-generated-provincia-search',
    templateUrl: './generated-provincia-search.component.html'
} )
export class GeneratedProvinciaSearchComponent extends GenericSearchComponent<Provincia> implements OnInit {


    provinciaFilter: ProvinciaFilter = new ProvinciaFilter();
  
    comunidadRefs: Comunidad[]=[];
  protected comunidadRefSelected!: any;
  @ViewChild("comunidadCodigoElement") comunidadCodigoElement!: ElementRef<HTMLInputElement>;  
  @ViewChild("comunidadRefElement") comunidadRefElement!: ElementRef<HTMLInputElement>;    
    constructor(
        public fb: FormBuilder,
        public provinciaService: ProvinciaService,
    ) {
        super();
        this.initializeParent();
    }
  
    protected initializeParent() {
        this.searchService = this.provinciaService;
        this.provinciaFilter = JSON.parse(
            sessionStorage.getItem("provinciaFilter") ?? "null"
        );
        if (!this.provinciaFilter) {
            this.provinciaFilter = new ProvinciaFilter();
            this.setFiltrosSubcampo();
        }
        this.searchFilter = this.provinciaFilter;
        this.nombreFilter = "provinciaFilter";
        this.nombreEntidad = "provincia";
    }    

    override ngOnInit() {
        this.setPropSelectValues();
    super.ngOnInit();
    }
    setSearchForm(): void {
        this.searchForm = this.fb.group({
      nombreeq: new FormControl( this.provinciaFilter?this.provinciaFilter.nombreeq:null, [] ),
        }
        );
    }

    setPropSelectValues() {
    }
  modifyFilter(provinciaFilter:ProvinciaFilter){  
  }
  

    setFiltrosSubcampo(){
    }
  get nombreeq() { return this.searchForm.get( 'nombreeq' ); }
    codigoChange(): void {
        /*Implementación por desarrollador*/
    }

    override clearPropSelects(): void {
    }

  saveFilter() {
    const idAmbito = JSON.parse(
      sessionStorage.getItem("entity") || "{}"
    )?.idAmbito;    
    localStorage.setItem(
      `customProvinciaFilter_${idAmbito}`,
      JSON.stringify(this.searchForm.value)
    );    
  }

  restoreFilter() {
    const idAmbito = JSON.parse(
      sessionStorage.getItem("entity") || "{}"
    )?.idAmbito;
    const customFilter = JSON.parse(
      localStorage.getItem(`customProvinciaFilter_${idAmbito}`) ?? "null"
    );
    if (customFilter) {
      this.provinciaFilter = customFilter;
      sessionStorage.setItem("provinciaFilter", JSON.stringify(customFilter));
      this.setSearchForm();
    }
  }  

}
