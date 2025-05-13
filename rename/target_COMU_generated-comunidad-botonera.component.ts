import {Component, OnInit, EventEmitter, Output,Input,ElementRef, ViewChild,Renderer2} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ComunidadService } from '../../../../customized/territorio/comunidad/service/comunidad.service';
import { GenericBotoneraListComponent, GenericDialogComponent, MODAL_OPTIONS } from "@jnum/jnum-core";
import { Comunidad } from "../../../../customized/territorio/comunidad/model/comunidad";
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Router} from '@angular/router';

/**
 * Botonera generada de la entidad Comunidad
 * @implements {OnInit}
 */
@Component({
  selector: 'app-generated-comunidad-botonera',
  templateUrl: './generated-comunidad-botonera.component.html'
})
export class GeneratedComunidadBotoneraComponent extends GenericBotoneraListComponent implements OnInit {

  @Input() isDetalle: boolean = false; 
  @Input() iseditable: boolean = true;  
  @Input() isheader: boolean = true;    
  hasvolver:boolean=false;
  setVisibleComunidadBtnDelete=false;
  setVisibleComunidadBtnEdit=false;
  setVisibleComunidadBtnNew=false;  
  isDisabledComunidadBtnDelete=false;
  isDisabledComunidadBtnEdit=false;
  isDisabledComunidadBtnView=false;
  isDisabledComunidadBtnNew=false;
  parameterComunidad!: string;
  titleBotoneraComunidad = "";
        

    constructor(
        public modalService:NgbModal,
    ) {
    super();
    this.entityService = this.injector.get(ComunidadService);   
    this.entityname = "comunidad";
    this.entitymodule = "territorio";    
    }
    
  override ngOnInit() {
    super.ngOnInit();    
  }

}