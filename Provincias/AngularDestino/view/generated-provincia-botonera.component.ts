import {Component, OnInit, EventEmitter, Output,Input,ElementRef, ViewChild,Renderer2} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProvinciaService } from '../../../../customized/territorio/provincia/service/provincia.service';
import { GenericBotoneraListComponent, GenericDialogComponent, MODAL_OPTIONS } from "@jnum/jnum-core";
import { Provincia } from "../../../../customized/territorio/provincia/model/provincia";
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Router} from '@angular/router';

/**
 * Botonera generada de la entidad Provincia
 * @implements {OnInit}
 */
@Component({
  selector: 'app-generated-provincia-botonera',
  templateUrl: './generated-provincia-botonera.component.html'
})
export class GeneratedProvinciaBotoneraComponent extends GenericBotoneraListComponent implements OnInit {

  @Input() isDetalle: boolean = false; 
  @Input() iseditable: boolean = true;  
  @Input() isheader: boolean = true;    
  hasvolver:boolean=false;
  setVisibleProvinciaBtnDelete=false;
  setVisibleProvinciaBtnEdit=false;
  setVisibleProvinciaBtnNew=false;  
  isDisabledProvinciaBtnDelete=false;
  isDisabledProvinciaBtnEdit=false;
  isDisabledProvinciaBtnView=false;
  isDisabledProvinciaBtnNew=false;
  parameterProvincia!: string;
  titleBotoneraProvincia = "";
        

    constructor(
        public modalService:NgbModal,
    ) {
    super();
    this.entityService = this.injector.get(ProvinciaService);   
    this.entityname = "provincia";
    this.entitymodule = "territorio";    
    }
    
  override ngOnInit() {
    super.ngOnInit();    
  }

}