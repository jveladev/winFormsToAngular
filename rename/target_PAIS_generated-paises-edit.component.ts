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
import { PaisesBotoneraOpComponent } from '../../../../customized/territorio/paises/view/paises-botonera-op.component';

/**
 * Edición generada de la entidad Paises
 * @implements {OnInit}
 */
@Component( {
    selector: 'app-generated-paises-edit',
    templateUrl: './generated-paises-edit.component.html'
} )
export class GeneratedPaisesEditComponent extends GenericComponent<Paises> implements OnInit {

  protected asimiladoAComunitarioCss:string="";
  tabpaisesCss:string="";
  protected paisesOutlet!:string;
  @ViewChild('paisesbotoneraop',{static:false}) paisesbotoneraop!: PaisesBotoneraOpComponent;    
  protected dataParent:any;
  protected editPaisesId:any;
  protected paisesEditForm!: FormGroup;
  @Input() paises!: Paises | null;  
  showGoToPrevious:boolean=true;
  
  constructor( 
    protected override renderer: Renderer2,
    protected override route: ActivatedRoute,
    protected override activeModal: NgbActiveModal,
    protected override modalService: NgbModal,    
    protected paisesService: PaisesService
  ) {
    super(paisesService, renderer, route, activeModal, '', 'paises', true);
  }
      
      
  override ngOnInit() {
    super.ngOnInit();
    this.origen='edit';
    this.embeddedEntity = true;
    this.paisesOutlet = this.utilService.activeOutlet;
    if (!this.popupdetalle) {    
      this.setPaisesEditId(); 
      super.getEntity(this.editPaisesId).subscribe({
        next: (entity) => {
          this.initComponent(entity);
        },
        error: (e) => this.initComponent(new Paises()),
        complete: () => {},
      });
    }  
    this.subscribes();    
  } 
  
  private setPaisesEditId() {
    if (this.data && this.data.entity) {    
      this.editPaisesId = this.data.entity.id.idEntidad+'/'+this.data.entity.id.idPais;
    }else{
        this.editPaisesId = this.route.snapshot.paramMap.get( 'idEntidad' )+'/'+this.route.snapshot.paramMap.get( 'idPais' );
    }          
  }  
  
  /**
   * Subscriptions of Paises
   * @returns void
   */  
  subscribes() {
  //Suscripciones a observables
  }       


  /**
   * unSubscriptions of Paises
   * @returns void
   */    
  override unSubscribe(): void {
    //Libera suscripciones
  }  
  
  getEditTitle() {
    return this.translate.instant('paises.editTitle');
  }
    
  updateFromDetalle(data?:any) {
    if (this.paisesService.memory) {
      this.onSubmit();
    } else {
      this.ngOnInit();
    }
  }      
    
  initComponent( paises:Paises ) {
    this.paises = paises;  
    this.entity =  paises;       
    this.setPaisesEditForm();
    this.handleDisabled();                                      
  }
  
    
  setPaisesEditForm() {
    this.paisesEditForm = this.fb.group( {
    type: new FormControl('paises',[]),
    module: new FormControl('territorio',[]),
    id: new FormControl( this.paises?.id, [] ),
    version: new FormControl( this.paises?.version, [] ),
    codigo: new FormControl(this.paises?.codigo, [Validators.required,JnumValidator.notOnlyWhiteSpaces,JnumValidator.number,JnumValidator.positive,Validators.maxLength(3)] ),
    nombre: new FormControl(this.paises?.nombre, [Validators.required,JnumValidator.notOnlyWhiteSpaces,Validators.maxLength(250)] ),
    digito: new FormControl(this.paises?.digito, [JnumValidator.number] ),
    activo: new FormControl(this.paises?.activo, [] ),
    comunitario: new FormControl(this.paises?.comunitario, [] ),
    asimiladoAComunitario: new FormControl(this.paises?.asimiladoAComunitario, [] ),
      }
      );   
    this.entityForm = this.paisesEditForm;
    this.initialFormValues = this.entityForm.value;
  }   
     
  handleDisabled():void{
  }   
     
               
  get id() { return this.paisesEditForm.get( 'id' ); }
  get version() { return this.paisesEditForm.get( 'version' ); }
  get codigo() { return this.paisesEditForm.get('codigo'); }
  get nombre() { return this.paisesEditForm.get('nombre'); }
  get digito() { return this.paisesEditForm.get('digito'); }
  get activo() { return this.paisesEditForm.get('activo'); }
  get comunitario() { return this.paisesEditForm.get('comunitario'); }
  get asimiladoAComunitario() { return this.paisesEditForm.get('asimiladoAComunitario'); }


  override onSubmit($event?: any) {
    this.checkEnterOnTextArea($event);
    if (this.popupdetalle) {
      this.updateInPopup();
    } else {    
    const returnto = $event == "list" ? $event : null;
      super.onSubmitUpdate( this.paisesEditForm,this.editPaisesId, returnto);
    }           
  }  

  override updateInPopup() {
    if (this.paisesEditForm.valid) {
      this.paises = {
        ...this.paises,
        ...this.paisesEditForm.getRawValue(),
      };
      this.modifyEntityRelations(this.paises);
      this.activeModal.close(this.paises);
    } else {
      this.validationFormService.validateAllFormFields(this.paisesEditForm);
    }
  }


                     
    codigoChange(){};
    comunitarioChange(){};

}

