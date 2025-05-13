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
import { ComunidadBotoneraOpComponent } from '../../../../customized/territorio/comunidad/view/comunidad-botonera-op.component';

/**
 * Edición generada de la entidad Comunidad
 * @implements {OnInit}
 */
@Component( {
    selector: 'app-generated-comunidad-edit',
    templateUrl: './generated-comunidad-edit.component.html'
} )
export class GeneratedComunidadEditComponent extends GenericComponent<Comunidad> implements OnInit {

  tabcomunidadCss:string="";
  protected comunidadOutlet!:string;
  @ViewChild('comunidadbotoneraop',{static:false}) comunidadbotoneraop!: ComunidadBotoneraOpComponent;    
  protected dataParent:any;
  protected editComunidadId:any;
  protected comunidadEditForm!: FormGroup;
  @Input() comunidad!: Comunidad | null;  
  showGoToPrevious:boolean=true;
  
  constructor( 
    protected override renderer: Renderer2,
    protected override route: ActivatedRoute,
    protected override activeModal: NgbActiveModal,
    protected override modalService: NgbModal,    
    protected comunidadService: ComunidadService
  ) {
    super(comunidadService, renderer, route, activeModal, '', 'comunidad', true);
  }
      
      
  override ngOnInit() {
    super.ngOnInit();
    this.origen='edit';
    this.embeddedEntity = true;
    this.comunidadOutlet = this.utilService.activeOutlet;
    if (!this.popupdetalle) {    
      this.setComunidadEditId(); 
      super.getEntity(this.editComunidadId).subscribe({
        next: (entity) => {
          this.initComponent(entity);
        },
        error: (e) => this.initComponent(new Comunidad()),
        complete: () => {},
      });
    }  
    this.subscribes();    
  } 
  
  private setComunidadEditId() {
    if (this.data && this.data.entity) {    
      this.editComunidadId = this.data.entity.id.idEntidad+'/'+this.data.entity.id.idComunidad;
    }else{
        this.editComunidadId = this.route.snapshot.paramMap.get( 'idEntidad' )+'/'+this.route.snapshot.paramMap.get( 'idComunidad' );
    }          
  }  
  
  /**
   * Subscriptions of Comunidad
   * @returns void
   */  
  subscribes() {
  //Suscripciones a observables
  }       


  /**
   * unSubscriptions of Comunidad
   * @returns void
   */    
  override unSubscribe(): void {
    //Libera suscripciones
  }  
  
  getEditTitle() {
    return this.translate.instant('comunidad.editTitle');
  }
    
  updateFromDetalle(data?:any) {
    if (this.comunidadService.memory) {
      this.onSubmit();
    } else {
      this.ngOnInit();
    }
  }      
    
  initComponent( comunidad:Comunidad ) {
    this.comunidad = comunidad;  
    this.entity =  comunidad;       
    this.setComunidadEditForm();
    this.handleDisabled();                                      
  }
  
    
  setComunidadEditForm() {
    this.comunidadEditForm = this.fb.group( {
    type: new FormControl('comunidad',[]),
    module: new FormControl('territorio',[]),
    id: new FormControl( this.comunidad?.id, [] ),
    version: new FormControl( this.comunidad?.version, [] ),
    codigo: new FormControl(this.comunidad?.codigo, [Validators.required,JnumValidator.notOnlyWhiteSpaces,JnumValidator.number,JnumValidator.positive,Validators.maxLength(2)] ),
    nombre: new FormControl(this.comunidad?.nombre, [Validators.required,JnumValidator.notOnlyWhiteSpaces,Validators.maxLength(100)] ),
    organo: new FormControl(this.comunidad?.organo, [Validators.maxLength(100)] ),
      }
      );   
    this.entityForm = this.comunidadEditForm;
    this.initialFormValues = this.entityForm.value;
  }   
     
  handleDisabled():void{
  }   
     
               
  get id() { return this.comunidadEditForm.get( 'id' ); }
  get version() { return this.comunidadEditForm.get( 'version' ); }
  get codigo() { return this.comunidadEditForm.get('codigo'); }
  get nombre() { return this.comunidadEditForm.get('nombre'); }
  get organo() { return this.comunidadEditForm.get('organo'); }


  override onSubmit($event?: any) {
    this.checkEnterOnTextArea($event);
    if (this.popupdetalle) {
      this.updateInPopup();
    } else {    
    const returnto = $event == "list" ? $event : null;
      super.onSubmitUpdate( this.comunidadEditForm,this.editComunidadId, returnto);
    }           
  }  

  override updateInPopup() {
    if (this.comunidadEditForm.valid) {
      this.comunidad = {
        ...this.comunidad,
        ...this.comunidadEditForm.getRawValue(),
      };
      this.modifyEntityRelations(this.comunidad);
      this.activeModal.close(this.comunidad);
    } else {
      this.validationFormService.validateAllFormFields(this.comunidadEditForm);
    }
  }


                     
    codigoChange(){};

}

