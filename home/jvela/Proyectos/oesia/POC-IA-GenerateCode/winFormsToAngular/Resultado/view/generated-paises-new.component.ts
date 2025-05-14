import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GenericNewComponent, ValidationFormService, MODAL_OPTIONS, GenericDialogComponent } from "@jnum/jnum-core";
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { PaisesService } from '../../../../customized/territorio/paises/service/paises.service';
import { Paises } from '../../../../customized/territorio/paises/model/paises';
import { UtilService, AlertType } from "@jnum/jnum-core";

/**
 * Creación generada de la entidad Paises
 * @implements {OnInit}
 */
@Component({
  selector: 'app-generated-paises-new',
  templateUrl: './generated-paises-new.component.html'
})
export class GeneratedPaisesNewComponent extends GenericNewComponent<Paises> implements OnInit {

  constructor(
    public paisesService: PaisesService,
  ) {
    super();
    this.initializeParent();
  }

  protected initializeParent() {
    this.newService = this.paisesService;
  }

  override ngOnInit() {
    let paisesData = new Paises();
    if (this.data?.entity) {
      this.processEntityFromPop();
    } else {
      this.entity = paisesData;
      this.setEntityForm();
    }
  }

  setEntityForm() {
    this.entityForm = this.fb.group({
      codigo: [this.entity ? this.entity.codigo : null, [Validators.required, Validators.maxLength(10)]],
      digito: [this.entity ? this.entity.digito : null, [Validators.maxLength(2)]],
      nombre: [this.entity ? this.entity.nombre : null, [Validators.required, Validators.maxLength(70)]],
      comunitario: [this.entity ? this.entity.comunitario : null, [Validators.maxLength(50)]],
      activo: [this.entity ? this.entity.activo : true],
      asimiladoAComunitario: [this.entity ? this.entity.asimiladoAComunitario : false],
    });
  }

  get codigo() { return this.entityForm.get('codigo'); }
  get digito() { return this.entityForm.get('digito'); }
  get nombre() { return this.entityForm.get('nombre'); }
  get comunitario() { return this.entityForm.get('comunitario'); }
  get activo() { return this.entityForm.get('activo'); }
  get asimiladoAComunitario() { return this.entityForm.get('asimiladoAComunitario'); }

  /**
   * Guarda una entidad.
   * 
   * @param {Paises} paises 
   */
  override add(paises: Paises) {
    this.isLoading = true;
    this.newService.addEntity(paises).subscribe(
      (result) => {
        this.isLoading = false;
        if (!this.hasError(result)) {
          if (this.data?.pop) {
            this.closeModal(result);
          } else {
            this.navigateToEntityListAfterAdd();
          }
        }
      },
      (error) => {
        this.isLoading = false;
        this.utilService.showAlertError(this.translate.instant("toaster.erroroperacion"));
      }
    );
  }

  closeForm() {
    if (this.data?.pop) {
      this.closeModal(null);
    } else {
      this.location.back();
    }
  }
}