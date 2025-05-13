import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GenericDialogComponent } from "@jnum/jnum-core";
import { GenericBotoneraOpComponent } from "@jnum/jnum-core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_OPTIONS } from "@jnum/jnum-core";
import { Subscription } from 'rxjs/internal/Subscription';
import { Comunidad } from "../../../../customized/territorio/comunidad/model/comunidad";
import { ComunidadService } from '../../../../customized/territorio/comunidad/service/comunidad.service';

/**
 * Botonera de operaciones generada de la entidad Comunidad
 * @implements {OnInit}
 */
@Component({
    selector: 'app-generated-comunidad-botonera-op',
    templateUrl: './generated-comunidad-botonera-op.component.html'
})
export class GeneratedComunidadBotoneraOpComponent  extends GenericBotoneraOpComponent{
  constructor( 
    protected modalService: NgbModal,
  ) {
    super(); 
    this.entityService = this.injector.get(ComunidadService);   
    this.isdetalle = this.entityService.isdetalle;      
  }
  

}