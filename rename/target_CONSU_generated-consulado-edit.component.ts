import { Component, OnInit,OnDestroy, Input, ElementRef, ViewChild, Renderer2, Inject, Output, EventEmitter,AfterViewInit, AfterViewChecked,TemplateRef,ViewContainerRef,ComponentRef } from '@angular/core';
import { GenericDialogComponent,GenericComponent,SectionsMapService,MODAL_OPTIONS,ValidationFormService,AlertType,ToasterService,NavigationService,UtilService,JnumValidator,} from "@jnum/jnum-core";
import { FormBuilder, FormGroup, Validators, FormControl,FormArray } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { lastValueFrom } from "rxjs/internal/lastValueFrom";
import { Paises } from '../../../../customized/territorio/paises/model/paises';
import { PaisesService } from '../../../../customized/territorio/paises/service/paises.service';
import { Entidad } from '../../../../customized/administracion/entidad/model/entidad';
import { EntidadService } from '../../../../customized/administracion/entidad/service/entidad.service';
//PropSelectSearch
import { PaisesPropSelectComponent } from '../../../../customized/territorio/paises/view/paises-prop-select.component';
import { PaisesFilter } from '../../../../customized/territorio/paises/filter/paises-filter';
import { PaisesNewComponent } from '../../../../customized/territorio/paises/view/paises-new.component';
import { PaisesEditComponent } from '../../../../customized/territorio/paises/view/paises-edit.component';
import { ConsuladoService } from '../../../../customized/territorio/consulado/service/consulado.service';
import { Consulado } from '../../../../customized/territorio/consulado/model/consulado';  
import { ConsuladoBotoneraOpComponent } from '../../../../customized/territorio/consulado/view/consulado-botonera-op.component';

/**
 * Edición generada de la entidad Consulado
 * @implements {OnInit}
 */
@Component( {
    selector: 'app-generated-consulado-edit',
    templateUrl: './generated-consulado-edit.component.html'
} )
export class GeneratedConsuladoEditComponent extends GenericComponent<Consulado> implements OnInit {

  tabconsuladoCss:string="";
  protected paisesService: PaisesService;    
  protected entidadService: EntidadService;    
  protected consuladoOutlet!:string;
        
  protected paisrefs: Paises[]=[];     
        
  protected idEntidads: Entidad[]=[];     
  selectedidEntidadOption: any = null;          
  protected paisrefSelected!: any;
  protected isPaisrefSelectedMultiple!: boolean;  
  protected paisrefPlaceholderText:string = this.translate.instant("global.propselect.placeholder",{ entidad: "País" });
  @ViewChild("codigoPaisPropElement") codigoPaisPropElement!: ElementRef<HTMLInputElement>;  
  @ViewChild("paisrefElement") paisrefElement!: ElementRef<HTMLInputElement>;   
  @ViewChild('consuladobotoneraop',{static:false}) consuladobotoneraop!: ConsuladoBotoneraOpComponent;    
  protected dataParent:any;
  protected editConsuladoId:any;
  protected consuladoEditForm!: FormGroup;
  @Input() consulado!: Consulado | null;  
  showGoToPrevious:boolean=true;
  
  constructor( 
    protected override renderer: Renderer2,
    protected override route: ActivatedRoute,
    protected override activeModal: NgbActiveModal,
    protected override modalService: NgbModal,    
    protected consuladoService: ConsuladoService
  ) {
    super(consuladoService, renderer, route, activeModal, '', 'consulado', true);
    this.paisesService = this.injector.get(PaisesService);      
    this.entidadService = this.injector.get(EntidadService);      
  }
      
      
  override ngOnInit() {
    super.ngOnInit();
    this.origen='edit';
    this.embeddedEntity = true;
    this.consuladoOutlet = this.utilService.activeOutlet;
    if (!this.popupdetalle) {    
      this.setConsuladoEditId(); 
      super.getEntity(this.editConsuladoId).subscribe({
        next: (entity) => {
          this.initComponent(entity);
        },
        error: (e) => this.initComponent(new Consulado()),
        complete: () => {},
      });
    }  
    this.subscribes();    
  } 
  
  private setConsuladoEditId() {
    if (this.data && this.data.entity) {    
      this.editConsuladoId = this.data.entity.id.idEntidad+'/'+this.data.entity.id.idConsulado;
    }else{
        this.editConsuladoId = this.route.snapshot.paramMap.get( 'idEntidad' )+'/'+this.route.snapshot.paramMap.get( 'idConsulado' );
    }          
  }  
  
  /**
   * Subscriptions of Consulado
   * @returns void
   */  
  subscribes() {
  //Suscripciones a observables
  }       


  /**
   * unSubscriptions of Consulado
   * @returns void
   */    
  override unSubscribe(): void {
    //Libera suscripciones
  }  
  
  getEditTitle() {
    return this.translate.instant('consulado.editTitle');
  }
    
  updateFromDetalle(data?:any) {
    if (this.consuladoService.memory) {
      this.onSubmit();
    } else {
      this.ngOnInit();
    }
  }      
    
  initComponent( consulado:Consulado ) {
    this.consulado = consulado;  
    this.entity =  consulado;       
    this.setConsuladoEditForm();
    this.paisrefSelected = consulado.paisref;
    this.handleDisabled();                                      
  }
  
    
  setConsuladoEditForm() {
    this.consuladoEditForm = this.fb.group( {
    type: new FormControl('consulado',[]),
    module: new FormControl('territorio',[]),
    id: new FormControl( this.consulado?.id, [] ),
    version: new FormControl( this.consulado?.version, [] ),
    paisref: new FormControl(this.consulado?.paisref, [Validators.required,JnumValidator.notOnlyWhiteSpaces] ),
    paisrefNombre: new FormControl(this.consulado?.paisref?.nombre, [Validators.required,JnumValidator.notOnlyWhiteSpaces,Validators.maxLength(250)] ),
    codigoPaisProp: new FormControl(this.consulado?.paisref?.codigo, [Validators.required,JnumValidator.notOnlyWhiteSpaces,JnumValidator.number,JnumValidator.positive,Validators.maxLength(3)] ),
    activo: new FormControl(this.consulado?.activo, [] ),
    codigo: new FormControl(this.consulado?.codigo, [Validators.required,JnumValidator.notOnlyWhiteSpaces,JnumValidator.number,JnumValidator.positive,Validators.maxLength(3)] ),
    nombre: new FormControl(this.consulado?.nombre, [Validators.required,JnumValidator.notOnlyWhiteSpaces,Validators.maxLength(250)] ),
      }
      );   
    this.entityForm = this.consuladoEditForm;
    this.initialFormValues = this.entityForm.value;
  }   
     
  handleDisabled():void{
  }   
     
               
  get id() { return this.consuladoEditForm.get( 'id' ); }
  get version() { return this.consuladoEditForm.get( 'version' ); }
  get paisref() { return this.consuladoEditForm.get('paisref'); }
  get paisrefNombre() { return this.consuladoEditForm.get('paisrefNombre' ); }
  get codigoPaisProp() { return this.consuladoEditForm.get('codigoPaisProp'); }                                            
  get activo() { return this.consuladoEditForm.get('activo'); }
  get codigo() { return this.consuladoEditForm.get('codigo'); }
  get nombre() { return this.consuladoEditForm.get('nombre'); }


  override onSubmit($event?: any) {
    this.checkEnterOnTextArea($event);
    if (this.popupdetalle) {
      this.updateInPopup();
    } else {    
    const returnto = $event == "list" ? $event : null;
      super.onSubmitUpdate( this.consuladoEditForm,this.editConsuladoId, returnto);
    }           
  }  

  override updateInPopup() {
    if (this.consuladoEditForm.valid) {
      this.consulado = {
        ...this.consulado,
        ...this.consuladoEditForm.getRawValue(),
      };
      this.modifyEntityRelations(this.consulado);
      this.activeModal.close(this.consulado);
    } else {
      this.validationFormService.validateAllFormFields(this.consuladoEditForm);
    }
  }


                     
  searchPaisref() {    
    const dialogRef = this.modalService.open(PaisesPropSelectComponent, MODAL_OPTIONS);   
    let data = this.setDataForPaisref();    
    dialogRef.componentInstance.data= data;        
    dialogRef.result.then((resultsearch) => {
      if (resultsearch){
        this.processResultForPropSelectPaisref(resultsearch);              
      } 
    });   
  }
  
  obtenerPaisrefByCodigoPaisProp($event:any){
    let codigoPaisProp = $event.target?$event.target.value:$event;
    this.paisrefSelected = null;
    if(!this.utilService.isNullOrUndefinedOrEmpty(codigoPaisProp)){
      const paisesFilter = new PaisesFilter();
      paisesFilter.codigoeq = codigoPaisProp;
      this.obtenerPaisrefFiltered(paisesFilter,this.codigoPaisPropElement);
    } else {
	    this.clearPaisref();
      this.codigoPaisPropElement.nativeElement.focus();
      this.codigoPaisPropElement.nativeElement.value=''; 
    }
  }     
  obtenerPaisrefByNombre($event: any) {
    let nombre = $event.target ? $event.target.value : $event;
    this.paisrefSelected = null;
    if (!this.utilService.isNullOrUndefinedOrEmpty(nombre)) {
      const paisesFilter = new PaisesFilter();
      paisesFilter.nombreeq = nombre;
      this.obtenerPaisrefFiltered(paisesFilter,this.paisrefElement);
    } else {
      this.clearPaisref();     
      this.paisrefElement.nativeElement.focus();  
      this.paisrefElement.nativeElement.value='';   
    }
  }
  setDataForPaisrefByFilters() {
    return {};
  }
  procesarPaisrefObtenido(data:any){
    if (data.content.length > 1) {
      const dialogRef = this.modalService.open(PaisesPropSelectComponent, MODAL_OPTIONS);   
      let data = this.setDataForPaisrefByFilters();    
      dialogRef.componentInstance.data= data;        
      dialogRef.result.then((resultsearch) => {
        if (resultsearch){
          this.paisrefSelected = resultsearch;
          this.paisref?.setValue(resultsearch);
          this.paisrefNombre?.setValue(resultsearch.nombre);
          this.codigoPaisProp?.setValue(resultsearch.codigo);
          this.processResultForPropSelectPaisref(resultsearch);              
        } 
        else {
          if (!this.paisrefSelected) {
              this.paisrefNombre?.setValue(null);
              this.codigoPaisProp?.setValue(null);
          }
        }
      });
    } else {
      this.paisrefSelected = data.content[0];
      this.paisref?.setValue(this.paisrefSelected);
      this.paisrefNombre?.setValue(this.paisrefSelected?.nombre);
      this.codigoPaisProp?.setValue(this.paisrefSelected?.codigo);
    }
  }

  obtenerPaisrefFiltered(paisesFilter: PaisesFilter,elementRef?: ElementRef) {
    this.paisesService
      .searchEntitiesByFilterNoPaginated(paisesFilter)
      .subscribe((data: any) => {
        if (data && !this.utilService.isEmptyList(data.content)) {
          this.procesarPaisrefObtenido(data);
        } else {
          this.clearPaisref();
          elementRef?.nativeElement.focus();
          if(elementRef){
            elementRef.nativeElement.value = "";
          }
        }
      });
  }
  procesarPaisrefByIdObtenido(data:any){
    this.paisrefSelected = data;
    this.paisref?.setValue(this.paisrefSelected);
    this.paisrefNombre?.setValue(this.paisrefSelected?.nombre);
    this.codigoPaisProp?.setValue(this.paisrefSelected?.codigo);
  }
  
  obtenerPaisrefById(id:any,elementRef?: ElementRef) {
    this.paisesService
      .getEntity(id)
      .subscribe((data: any) => {
        if (data) {
          this.procesarPaisrefByIdObtenido(data);
        } else {
          this.clearPaisref();
          elementRef?.nativeElement.focus();    
          if(elementRef){
            elementRef.nativeElement.value = "";
          }
        }
      });  
  }
 
    
  setDataForPaisref(): any{
    return {
      paisesSelected: this.paisrefSelected
    };   
  }
    
  processResultForPropSelectPaisref(resultsearch: any) {
    if(this.consulado){
      this.consulado.paisref = resultsearch;
      this.paisrefSelected = resultsearch;
    }    	
    this.isPaisrefSelectedMultiple = !this.utilService.isEmptyList(resultsearch);   
    this.paisref?.setValue(resultsearch); 
    this.paisrefNombre?.setValue(resultsearch.nombre);
    this.codigoPaisProp?.setValue(resultsearch.codigo);
  }    
    
  addPaisref() {
    const dialogRef = this.modalService.open(PaisesNewComponent, MODAL_OPTIONS);
    let data = this.setDataForAddPaisref();
    dialogRef.componentInstance.data= data;       
    dialogRef.result.then((resultadd) => {
      if (resultadd){
        this.processResultForAddPaisref(resultadd);
      } 
    });    
  }
    
  setDataForAddPaisref(): any{
    return {
      pop: true
    }
  }    
    
  processResultForAddPaisref(resultadd:any){
  	 if(this.consulado){
      this.consulado.paisref = resultadd;
     }    	
    this.codigoPaisProp?.setValue(resultadd.codigo);
  }

  editPaisref( paisref: Paises ) {
    if ( paisref ) {    
      const dialogRef = this.modalService.open(PaisesEditComponent, MODAL_OPTIONS);
      let data = this.setDataForEditPaisref(paisref);
      dialogRef.componentInstance.data= data;           
      dialogRef.result.then((resultedit) => {
        if (resultedit){
          this.processResultForEditPaisref(resultedit);
        } 
      });
    }
  }    
    
  setDataForEditPaisref(paisref:Paises):any{
    return  {
      pop: true,
      entity: paisref
    }
  }    
    
  processResultForEditPaisref(resultedit:any){
   if(this.consulado){
    this.consulado.paisref = resultedit;
    }     
    this.codigoPaisProp?.setValue(resultedit.codigo);
  }    
  
  
  deletePaisref(paisref: Paises) {
    if ( paisref) {
      const dialogRef = this.modalService.open(
        GenericDialogComponent,
        MODAL_OPTIONS
      );

      const data = this.setDataForOpenDeleteDialogPaisref();
      dialogRef.componentInstance.data = data;
      
      dialogRef.result.then((result) => {
        if (result) {
          this.paisesService.deleteEntity(this.utilService.getEntityId(paisref.id)).subscribe(() => {
            this.clearPaisref()
          });
        }
      });
    }
  }   
  

  setDataForOpenDeleteDialogPaisref(): any {
    return {
      titulo: this.translate.instant("global.eliminar"),
      content: this.translate.instant("global.eliminartxt"),
    };
  }  
  
  clearPaisref() {
   if(this.consulado){
    this.consulado.paisref = null;
   }     
    this.paisrefSelected = null;
    this.paisref?.setValue(null);
    this.paisrefNombre?.setValue(null);
    this.codigoPaisProp?.setValue(null);
  }
    codigoChange(){};

}

