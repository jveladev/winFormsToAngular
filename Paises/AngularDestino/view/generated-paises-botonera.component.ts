import {Component, OnInit, EventEmitter, Output,Input,ElementRef, ViewChild,Renderer2} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PaisesService } from '../../../../customized/territorio/paises/service/paises.service';
import { GenericBotoneraListComponent, GenericDialogComponent, MODAL_OPTIONS } from "@jnum/jnum-core";
import { Paises } from "../../../../customized/territorio/paises/model/paises";
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Router} from '@angular/router';

/**
 * Botonera generada de la entidad Paises
 * @implements {OnInit}
 */
@Component({
  selector: 'app-generated-paises-botonera',
  templateUrl: './generated-paises-botonera.component.html'
})
export class GeneratedPaisesBotoneraComponent extends GenericBotoneraListComponent implements OnInit {

  @Input() isDetalle: boolean = false; 
  @Input() iseditable: boolean = true;  
  @Input() isheader: boolean = true;    
  hasvolver:boolean=false;
  setVisiblePaisesBtnDelete=false;
  setVisiblePaisesBtnEdit=false;
  setVisiblePaisesBtnNew=false;  
  isDisabledPaisesBtnDelete=false;
  isDisabledPaisesBtnEdit=false;
  isDisabledPaisesBtnView=false;
  isDisabledPaisesBtnNew=false;
  parameterPaises!: string;
  titleBotoneraPaises = "";
        

    constructor(
        public modalService:NgbModal,
    ) {
    super();
    this.entityService = this.injector.get(PaisesService);   
    this.entityname = "paises";
    this.entitymodule = "territorio";    
    }
    
  override ngOnInit() {
    super.ngOnInit();    
  }

}