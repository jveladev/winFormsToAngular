import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, TemplateRef, ViewContainerRef, Input } from '@angular/core';
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
import { PaisesService } from '../../../../customized/territorio/paises/service/paises.service';
import { PaisesFilter } from '../../../../customized/territorio/paises/filter/paises-filter';
import { Paises } from '../../../../customized/territorio/paises/model/paises';
import { environment } from '../../../../../environments/environment'
import { PageModel } from "@jnum/jnum-core";

/**
 * Búsqueda generada de la entidad Paises
 * @implements {OnInit}
 */
@Component({
  selector: 'app-generated-paises-search',
  templateUrl: './generated-paises-search.component.html'
})
export class GeneratedPaisesSearchComponent extends GenericSearchComponent<Paises> implements OnInit {

  paisesFilter: PaisesFilter = new PaisesFilter();

  constructor(
    public fb: FormBuilder,
    public paisesService: PaisesService,
  ) {
    super();
    this.initializeParent();
  }
  
  protected initializeParent() {
    this.searchService = this.paisesService;
    this.paisesFilter = JSON.parse(
      sessionStorage.getItem("paisesFilter") ?? "null"
    );
    if (!this.paisesFilter) {
      this.paisesFilter = new PaisesFilter();
      this.setFiltrosSubcampo();
    }
    this.searchFilter = this.paisesFilter;
    this.nombreFilter = "paisesFilter";
    this.nombreEntidad = "paises";
  }    

  override ngOnInit() {
    this.setPropSelectValues();
    super.ngOnInit();
  }
  
  setSearchForm(): void {
    this.searchForm = this.fb.group({
      nombreeq: new FormControl(this.paisesFilter ? this.paisesFilter.nombreeq : null, []),
      mostrarNoActivoseq: new FormControl(this.paisesFilter ? this.paisesFilter.mostrarNoActivoseq : null, []),
    });
  }

  setPropSelectValues() {
    // Aquí se configuran los valores iniciales de los propSelect si los hubiera
  }
  
  modifyFilter(paisesFilter: PaisesFilter) {  
    // Modificaciones adicionales al filtro si son necesarias
  }
  
  setFiltrosSubcampo() {
    // Inicialización de filtros de subcampos si los hubiera
  }
  
  get nombreeq() { return this.searchForm.get('nombreeq'); }
  get mostrarNoActivoseq() { return this.searchForm.get('mostrarNoActivoseq'); }

  override clearPropSelects(): void {
    // Limpiar selecciones de propSelects si los hubiera
  }

  saveFilter() {
    const idAmbito = JSON.parse(
      sessionStorage.getItem("entity") || "{}"
    )?.idAmbito;    
    localStorage.setItem(
      `customPaisesFilter_${idAmbito}`,
      JSON.stringify(this.searchForm.value)
    );    
  }

  restoreFilter() {
    const idAmbito = JSON.parse(
      sessionStorage.getItem("entity") || "{}"
    )?.idAmbito;
    const customFilter = JSON.parse(
      localStorage.getItem(`customPaisesFilter_${idAmbito}`) ?? "null"
    );
    if (customFilter) {
      this.paisesFilter = customFilter;
      sessionStorage.setItem("paisesFilter", JSON.stringify(customFilter));
      this.setSearchForm();
    }
  }  
}