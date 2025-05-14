import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PaisesFilter } from '../../../../customized/territorio/paises/filter/paises-filter';
import { PaisesService } from '../../../../customized/territorio/paises/service/paises.service';
import { Paises } from '../../../../customized/territorio/paises/model/paises';
import { GeneratedPaisesSearchComponent } from './generated-paises-search.component';
import { GeneratedPaisesListComponent } from './generated-paises-list.component';
import { UtilService, GenericWrapperComponent, AlertType } from "@jnum/jnum-core";

/**
 * Listado wrapper generado de la entidad Paises
 * @implements {OnInit}
 */
@Component({
  selector: 'app-generated-paises-list-wrapper',
  templateUrl: './generated-paises-list-wrapper.component.html'
})
export class GeneratedPaisesListWrapperComponent extends GenericWrapperComponent<Paises> implements OnInit {

  @ViewChild('searchPaisesForm') searchPaisesForm!: GeneratedPaisesSearchComponent;
  @ViewChild('paisesListTable') paisesListTable!: GeneratedPaisesListComponent;
  paisesFilter: PaisesFilter = new PaisesFilter();
  
  constructor(
    public paisesService: PaisesService,
  ) {
    super();
    this.wrapperService = this.paisesService;
  }

  override ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        const id = params['id'];
        this.wrapperService.getEntity(id).subscribe(data => {
          if (!this.hasError(data)) {
            this.entity = data;
            sessionStorage.setItem("entity", JSON.stringify(this.entity));
          }
        });
      }
      super.ngOnInit();
    });
  }

  /**
   * Captura el evento y lo propaga.
   * 
   * @param event
   */
  searchHandler(event: any) {
    if (this.paisesListTable) {
      this.paisesListTable.filter = event;
      this.paisesListTable.getEntitiesByFilterPaginated();
    }
  }

  /**
   * Captura el evento y lo propaga.
   * 
   * @param {Paises} paises 
   */
  viewEntityHandler(paises: Paises) {
    this.viewEntity(paises);
  }

  /**
   * Captura el evento y lo propaga.
   * 
   * @param {Paises} paises 
   */
  editEntityHandler(paises: Paises) {
    this.editEntity(paises);
  }

  /**
   * Navega a new.
   */
  addEntityHandler() {
    this.addEntity();
  }
}