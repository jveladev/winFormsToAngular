import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GenericDialogComponent } from "@jnum/jnum-core";
import { GenericBotoneraOpComponent } from "@jnum/jnum-core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_OPTIONS } from "@jnum/jnum-core";
import { Subscription } from 'rxjs/internal/Subscription';
import { Provincia } from "../../../../customized/territorio/provincia/model/provincia";
import { ProvinciaService } from '../../../../customized/territorio/provincia/service/provincia.service';

/**
 * Botonera de operaciones generada de la entidad Provincia
 * @implements {OnInit}
 */
@Component({
    selector: 'app-generated-provincia-botonera-op',
    templateUrl: './generated-provincia-botonera-op.component.html'
})
export class GeneratedProvinciaBotoneraOpComponent  extends GenericBotoneraOpComponent{
  constructor( 
    protected modalService: NgbModal,
  ) {
    super(); 
    this.entityService = this.injector.get(ProvinciaService);   
    this.isdetalle = this.entityService.isdetalle;      
  }
  

}