import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GenericDialogComponent } from "@jnum/jnum-core";
import { GenericBotoneraOpComponent } from "@jnum/jnum-core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_OPTIONS } from "@jnum/jnum-core";
import { Subscription } from 'rxjs/internal/Subscription';
import { Municipios } from "../../../../customized/territorio/municipios/model/municipios";
import { MunicipiosService } from '../../../../customized/territorio/municipios/service/municipios.service';

/**
 * Botonera de operaciones generada de la entidad Municipios
 * @implements {OnInit}
 */
@Component({
    selector: 'app-generated-municipios-botonera-op',
    templateUrl: './generated-municipios-botonera-op.component.html'
})
export class GeneratedMunicipiosBotoneraOpComponent  extends GenericBotoneraOpComponent{
  constructor( 
    protected modalService: NgbModal,
  ) {
    super(); 
    this.entityService = this.injector.get(MunicipiosService);   
    this.isdetalle = this.entityService.isdetalle;      
  }
  

}