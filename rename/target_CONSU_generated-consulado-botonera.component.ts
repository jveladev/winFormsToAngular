import {Component, OnInit, EventEmitter, Output,Input,ElementRef, ViewChild,Renderer2} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ConsuladoService } from '../../../../customized/territorio/consulado/service/consulado.service';
import { GenericBotoneraListComponent, GenericDialogComponent, MODAL_OPTIONS } from "@jnum/jnum-core";
import { Consulado } from "../../../../customized/territorio/consulado/model/consulado";
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Router} from '@angular/router';

/**
 * Botonera generada de la entidad Consulado
 * @implements {OnInit}
 */
@Component({
  selector: 'app-generated-consulado-botonera',
  templateUrl: './generated-consulado-botonera.component.html'
})
export class GeneratedConsuladoBotoneraComponent extends GenericBotoneraListComponent implements OnInit {

  @Input() isDetalle: boolean = false; 
  @Input() iseditable: boolean = true;  
  @Input() isheader: boolean = true;    
  hasvolver:boolean=false;
  setVisibleConsuladoBtnDelete=false;
  setVisibleConsuladoBtnEdit=false;
  setVisibleConsuladoBtnNew=false;  
  isDisabledConsuladoBtnDelete=false;
  isDisabledConsuladoBtnEdit=false;
  isDisabledConsuladoBtnView=false;
  isDisabledConsuladoBtnNew=false;
  parameterConsulado!: string;
  titleBotoneraConsulado = "";
        

    constructor(
        public modalService:NgbModal,
    ) {
    super();
    this.entityService = this.injector.get(ConsuladoService);   
    this.entityname = "consulado";
    this.entitymodule = "territorio";    
    }
    
  override ngOnInit() {
    super.ngOnInit();    
  }

}