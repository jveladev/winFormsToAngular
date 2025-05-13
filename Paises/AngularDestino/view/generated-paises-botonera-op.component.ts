import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GenericDialogComponent } from "@jnum/jnum-core";
import { GenericBotoneraOpComponent } from "@jnum/jnum-core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_OPTIONS } from "@jnum/jnum-core";
import { Subscription } from 'rxjs/internal/Subscription';
import { Paises } from "../../../../customized/territorio/paises/model/paises";
import { PaisesService } from '../../../../customized/territorio/paises/service/paises.service';

/**
 * Botonera de operaciones generada de la entidad Paises
 * @implements {OnInit}
 */
@Component({
    selector: 'app-generated-paises-botonera-op',
    templateUrl: './generated-paises-botonera-op.component.html'
})
export class GeneratedPaisesBotoneraOpComponent  extends GenericBotoneraOpComponent{
  constructor( 
    protected modalService: NgbModal,
  ) {
    super(); 
    this.entityService = this.injector.get(PaisesService);   
    this.isdetalle = this.entityService.isdetalle;      
  }
  

}