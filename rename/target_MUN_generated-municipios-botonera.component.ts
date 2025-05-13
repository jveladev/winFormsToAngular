import {Component, OnInit, EventEmitter, Output,Input,ElementRef, ViewChild,Renderer2} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MunicipiosService } from '../../../../customized/territorio/municipios/service/municipios.service';
import { GenericBotoneraListComponent, GenericDialogComponent, MODAL_OPTIONS } from "@jnum/jnum-core";
import { Municipios } from "../../../../customized/territorio/municipios/model/municipios";
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Router} from '@angular/router';

/**
 * Botonera generada de la entidad Municipios
 * @implements {OnInit}
 */
@Component({
  selector: 'app-generated-municipios-botonera',
  templateUrl: './generated-municipios-botonera.component.html'
})
export class GeneratedMunicipiosBotoneraComponent extends GenericBotoneraListComponent implements OnInit {

  @Input() isDetalle: boolean = false; 
  @Input() iseditable: boolean = true;  
  @Input() isheader: boolean = true;    
  hasvolver:boolean=false;
  setVisibleMunicipiosBtnDelete=false;
  setVisibleMunicipiosBtnEdit=false;
  setVisibleMunicipiosBtnNew=false;  
  isDisabledMunicipiosBtnDelete=false;
  isDisabledMunicipiosBtnEdit=false;
  isDisabledMunicipiosBtnView=false;
  isDisabledMunicipiosBtnNew=false;
  parameterMunicipios!: string;
  titleBotoneraMunicipios = "";
        

    constructor(
        public modalService:NgbModal,
    ) {
    super();
    this.entityService = this.injector.get(MunicipiosService);   
    this.entityname = "municipios";
    this.entitymodule = "territorio";    
    }
    
  override ngOnInit() {
    super.ngOnInit();    
  }

}