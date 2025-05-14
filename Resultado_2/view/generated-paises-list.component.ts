import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewContainerRef } from '@angular/core';
import { GenericListComponent, GenericDialogComponent, UtilService, AlertType, MODAL_OPTIONS, SortType, PageModel } from "@jnum/jnum-core";
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaisesService } from '../../../../customized/territorio/paises/service/paises.service';
import { Paises } from '../../../../customized/territorio/paises/model/paises';
import { PaisesFilter } from '../../../../customized/territorio/paises/filter/paises-filter';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { PageEvent } from "@jnum/jnum-core";

/**
 * Listado generado de la entidad Paises
 * @implements {OnInit}
 */
@Component({
  selector: 'app-generated-paises-list',
  templateUrl: './generated-paises-list.component.html'
})
export class GeneratedPaisesListComponent extends GenericListComponent<Paises> implements OnInit {

  @Input('paisesFilter') public paisesFilterItem: PaisesFilter = new PaisesFilter();

  constructor(
    public paisesService: PaisesService,
  ) {
    super();
    this.initializeParent();
  }

  initializeParent() {
    this.listService = this.paisesService;
    this.pageSize = 10;
    this.filter = this.paisesFilterItem;
    this.setDisplayedColumns();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.paisesService.getReloadPaisesSubject().pipe(takeUntil(this.destroy$)).subscribe(next => {
      if (next) {
        this.filter = JSON.parse(sessionStorage.getItem("paisesFilter") ?? "{}");
        this.getEntitiesByFilterPaginated(this.getPageEvent());
      }
    });
  }

  setDisplayedColumns() {
    this.displayedColumns = [
      'codigo',
      'digito',
      'nombre',
      'comunitario',
      'activo',
      'asimiladoAComunitario',
      'operations'
    ];
  }

  /**
   * Obtiene los datos paginados de back.
   * 
   * @param event 
   */
  override getEntitiesByFilterPaginated(event?: PageEvent) {
    event = this.initPageEvent(event);
    this.getEntitiesByFilterPaginatedSubject = this.listService
      .searchEntitiesByFilter(this.filter, this.pageSize, event, this.sort);
    this.getEntitiesByFilterPaginatedSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe((page) => {
        this.page = page;
        this.sortByIdTable = this.getInitSortByIdTable();
        if (!this.backEndSorted) {
          this.dataSource = this.getDataPageModel(page, event, this.sort);
        } else {
          this.dataSource = this.getDataPageModelB(page, event);
        }
      });
    return this.getEntitiesByFilterPaginatedSubject;
  }

  /**
   * Abre el modal de confirmación para eliminar.
   * 
   * @param {Paises} paises 
   */
  openDeleteDialog(paises: Paises) {
    this.openDeleteDialogGeneric(
      paises,
      this.setDataForOpenDeleteDialog()
    );
  }

  setDataForOpenDeleteDialog() {
    return {
      titulo: this.translate.instant("global.eliminar"),
      content: this.translate.instant("global.eliminartxt"),
    };
  }

  setDataForClone(entity: Paises) {
    const newEntity = { ...entity };
    newEntity.id = undefined;
    return {
      pop: true,
      clone: true,
      entity: newEntity,
    };
  }
}