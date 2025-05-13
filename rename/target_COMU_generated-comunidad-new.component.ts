import { Component, OnInit,OnDestroy, Input, ElementRef, ViewChild, Renderer2, Inject, Output, EventEmitter,AfterViewInit, AfterViewChecked,TemplateRef,ViewContainerRef,ComponentRef } from '@angular/core';
import { GenericDialogComponent,GenericComponent,SectionsMapService,MODAL_OPTIONS,ValidationFormService,AlertType,ToasterService,NavigationService,UtilService,JnumValidator,} from "@jnum/jnum-core";
import { FormBuilder, FormGroup, Validators, FormControl,FormArray } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { lastValueFrom } from "rxjs/internal/lastValueFrom";
import { ComunidadService } from '../../../../customized/territorio/comunidad/service/comunidad.service';
import { Comunidad } from '../../../../customized/territorio/comunidad/model/comunidad';  

/**
 * Creación generado de la entidad Comunidad
 * @implements {OnInit}
 */
@Component( {
    selector: 'app-generated-comunidad-new',
    templateUrl: './generated-comunidad-new.component.html'
} )
export class GeneratedComunidadNewComponent extends GenericComponent<Comunidad> implements OnInit {

  protected comunidadOutlet!:string;


  @Output() closeModalEvent = new EventEmitter<any>();

  protected comunidadNewForm!: FormGroup; 
  protected newComunidad: Comunidad = new Comunidad();


  constructor(
      protected override renderer: Renderer2,
      protected override route: ActivatedRoute,
      protected override activeModal: NgbActiveModal,
      protected override modalService: NgbModal,
      protected comunidadService: ComunidadService
  ) {
    super(comunidadService, renderer, route, activeModal, 'territorio/comunidad/comunidadedit','comunidad', true);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.origen='new';
    this.embeddedEntity = true;
    this.comunidadOutlet = this.utilService.activeOutlet;
    this.setComunidadNewForm();    
    this.handleDisabled();
    this.checkDetailsInModal();
  }
    
  setComunidadNewForm(): void {
    this.comunidadNewForm = this.fb.group({          
      type: new FormControl('comunidad',[]),
      module: new FormControl('territorio',[]),
    codigo: new FormControl({value:this.newComunidad.codigo,disabled:false}, [Validators.required,JnumValidator.notOnlyWhiteSpaces,JnumValidator.number,JnumValidator.positive,Validators.maxLength(2)] ),
    nombre: new FormControl({value:this.newComunidad.nombre,disabled:false}, [Validators.required,JnumValidator.notOnlyWhiteSpaces,Validators.maxLength(100)] ),
    organo: new FormControl({value:this.newComunidad.organo,disabled:false}, [Validators.maxLength(100)] ),
      }
    ); 
    this.entityForm = this.comunidadNewForm;
    this.initialFormValues = this.entityForm.value;
  }

   
  getNewTitle():string{
      return this.translate.instant('comunidad.addTitle');
  }
    
  handleDisabled():void{
  } 
               

  initComponent(comunidad:Comunidad){};
  
  get idEntidad() { return this.comunidadNewForm.get( 'idEntidad' ); } 
  get idComunidad() { return this.comunidadNewForm.get( 'idComunidad' ); } 
      get codigo() { return this.comunidadNewForm.get( 'codigo' ); }
      get nombre() { return this.comunidadNewForm.get( 'nombre' ); }
      get organo() { return this.comunidadNewForm.get( 'organo' ); }

    
  override onSubmit($event?:any) {
  	const returnto = $event == "list" || $event == "new" ? $event : null;
    this.checkEnterOnTextArea($event);
    super.onSubmitEmbedded(this.comunidadNewForm,this.newComunidad,'comunidad',this.comunidadOutlet,returnto);
             
  }    

 

    codigoChange(){};




  override closeDetailModal() {
    this.closeModalEvent.emit(true);
  }


}



