import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GenericDialogComponent } from "@jnum/jnum-core";
import { GenericBotoneraOpComponent } from "@jnum/jnum-core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_OPTIONS } from "@jnum/jnum-core";
import { Subscription } from 'rxjs/internal/Subscription';
import { Consulado } from "../../../../customized/territorio/consulado/model/consulado";
import { ConsuladoService } from '../../../../customized/territorio/consulado/service/consulado.service';

/**
 * Botonera de operaciones generada de la entidad Consulado
 * @implements {OnInit}
 */
@Component({
    selector: 'app-generated-consulado-botonera-op',
    templateUrl: './generated-consulado-botonera-op.component.html'
})
export class GeneratedConsuladoBotoneraOpComponent  extends GenericBotoneraOpComponent{
  constructor( 
    protected modalService: NgbModal,
  ) {
    super(); 
    this.entityService = this.injector.get(ConsuladoService);   
    this.isdetalle = this.entityService.isdetalle;      
  }
  

}