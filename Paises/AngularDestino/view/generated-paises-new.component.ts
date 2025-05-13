import { Component, OnInit,OnDestroy, Input, ElementRef, ViewChild, Renderer2, Inject, Output, EventEmitter,AfterViewInit, AfterViewChecked,TemplateRef,ViewContainerRef,ComponentRef } from '@angular/core';
import { GenericDialogComponent,GenericComponent,SectionsMapService,MODAL_OPTIONS,ValidationFormService,AlertType,ToasterService,NavigationService,UtilService,JnumValidator,} from "@jnum/jnum-core";
import { FormBuilder, FormGroup, Validators, FormControl,FormArray } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { lastValueFrom } from "rxjs/internal/lastValueFrom";
import { PaisesService } from '../../../../customized/territorio/paises/service/paises.service';
import { Paises } from '../../../../customized/territorio/paises/model/paises';  

/**
 * Creación generado de la entidad Paises
 * @implements {OnInit}
 */
@Component( {
    selector: 'app-generated-paises-new',
    templateUrl: './generated-paises-new.component.html'
} )
export class GeneratedPaisesNewComponent extends GenericComponent<Paises> implements OnInit {

  protected asimiladoAComunitarioCss:string="";
  protected paisesOutlet!:string;


  @Output() closeModalEvent = new EventEmitter<any>();

  protected paisesNewForm!: FormGroup; 
  protected newPaises: Paises = new Paises();


  constructor(
      protected override renderer: Renderer2,
      protected override route: ActivatedRoute,
      protected override activeModal: NgbActiveModal,
      protected override modalService: NgbModal,
      protected paisesService: PaisesService
  ) {
    super(paisesService, renderer, route, activeModal, 'territorio/paises/paisesedit','paises', true);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.origen='new';
    this.embeddedEntity = true;
    this.paisesOutlet = this.utilService.activeOutlet;
    this.setPaisesNewForm();    
    this.handleDisabled();
    this.checkDetailsInModal();
  }
    
  setPaisesNewForm(): void {
    this.paisesNewForm = this.fb.group({          
      type: new FormControl('paises',[]),
      module: new FormControl('territorio',[]),
      idPais: new FormControl('', [JnumValidator.number,JnumValidator.positive,Validators.maxLength(3)] ),
    codigo: new FormControl({value:this.newPaises.codigo,disabled:false}, [Validators.required,JnumValidator.notOnlyWhiteSpaces,JnumValidator.number,JnumValidator.positive,Validators.maxLength(3)] ),
    nombre: new FormControl({value:this.newPaises.nombre,disabled:false}, [Validators.required,JnumValidator.notOnlyWhiteSpaces,Validators.maxLength(250)] ),
    comunitario: new FormControl({value: this.newPaises.comunitario?this.newPaises.comunitario:false,disabled:false}, [] ),
    digito: new FormControl({value:this.newPaises.digito,disabled:false}, [JnumValidator.number] ),
    activo: new FormControl({value: this.newPaises.activo?this.newPaises.activo:true,disabled:false}, [] ),
    asimiladoAComunitario: new FormControl({value: this.newPaises.asimiladoAComunitario?this.newPaises.asimiladoAComunitario:false,disabled:false}, [] ),
      }
    ); 
    this.entityForm = this.paisesNewForm;
    this.initialFormValues = this.entityForm.value;
  }

   
  getNewTitle():string{
      return this.translate.instant('paises.addTitle');
  }
    
  handleDisabled():void{
  } 
               

  initComponent(paises:Paises){};
  
  get idEntidad() { return this.paisesNewForm.get( 'idEntidad' ); } 
  get idPais() { return this.paisesNewForm.get( 'idPais' ); } 
      get codigo() { return this.paisesNewForm.get( 'codigo' ); }
      get nombre() { return this.paisesNewForm.get( 'nombre' ); }
      get comunitario() { return this.paisesNewForm.get( 'comunitario' ); }
      get digito() { return this.paisesNewForm.get( 'digito' ); }
      get activo() { return this.paisesNewForm.get( 'activo' ); }
      get asimiladoAComunitario() { return this.paisesNewForm.get( 'asimiladoAComunitario' ); }
      get mostrarNoActivos() { return this.paisesNewForm.get( 'mostrarNoActivos' ); }

    
  override onSubmit($event?:any) {
  	const returnto = $event == "list" || $event == "new" ? $event : null;
    this.checkEnterOnTextArea($event);
    super.onSubmitEmbedded(this.paisesNewForm,this.newPaises,'paises',this.paisesOutlet,returnto);
             
  }    

 

    codigoChange(){};
    comunitarioChange(){};




  override closeDetailModal() {
    this.closeModalEvent.emit(true);
  }


}



