import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GenericEditComponent, ValidationFormService, JnumValidator, MODAL_OPTIONS, GenericDialogComponent } from "@jnum/jnum-core";
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { PaisesService } from '../../../../customized/territorio/paises/service/paises.service';
import { Paises } from '../../../../customized/territorio/paises/model/paises';
import { Location } from '@angular/common';
import { UtilService, AlertType } from "@jnum/jnum-core";

/**
 * Edición generada de la entidad Paises
 * @implements {OnInit}
 */
@Component({
  selector: 'app-generated-paises-edit',
  templateUrl: './generated-paises-edit.component.html'
})
export class GeneratedPaisesEditComponent extends GenericEditComponent<Paises> implements OnInit {

  constructor(
    public paisesService: PaisesService,
  ) {
    super();
    this.initializeParent();
  }

  protected initializeParent() {
    this.editService = this.paisesService;
  }

  override ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        const id = params['id'];
        this.editService.getEntity(id).subscribe(data => {
          if (!this.hasError(data)) {
            this.entity = data;
            this.setEntityForm();
            this.setCustomFields();
          }
        });
      } else {
        this.entity = new Paises();
        this.setEntityForm();
      }
    });
  }

  protected setEntityForm() {
    this.entityForm = this.fb.group({
      id: [this.entity ? this.entity.id : null],
      codigo: [this.entity ? this.entity.codigo : null, [Validators.required, Validators.maxLength(10)]],
      digito: [this.entity ? this.entity.digito : null, [Validators.maxLength(2)]],
      nombre: [this.entity ? this.entity.nombre : null, [Validators.required, Validators.maxLength(70)]],
      comunitario: [this.entity ? this.entity.comunitario : null, [Validators.maxLength(50)]],
      activo: [this.entity ? this.entity.activo : true],
      asimiladoAComunitario: [this.entity ? this.entity.asimiladoAComunitario : false],
    });
  }

  protected setCustomFields() {
    // Configuraciones adicionales de campos si son necesarias
  }

  get id() { return this.entityForm.get('id'); }
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
  override save(paises: Paises) {
    return super.save(paises);
  }

  closeForm() {
    if (this.data?.pop) {
      this.closeModal(null);
    } else {
      this.location.back();
    }
  }
}