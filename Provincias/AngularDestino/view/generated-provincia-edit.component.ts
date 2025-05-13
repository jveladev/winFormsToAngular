import { Component, OnInit,OnDestroy, Input, ElementRef, ViewChild, Renderer2, Inject, Output, EventEmitter,AfterViewInit, AfterViewChecked,TemplateRef,ViewContainerRef,ComponentRef } from '@angular/core';
import { GenericDialogComponent,GenericComponent,SectionsMapService,MODAL_OPTIONS,ValidationFormService,AlertType,ToasterService,NavigationService,UtilService,JnumValidator,} from "@jnum/jnum-core";
import { FormBuilder, FormGroup, Validators, FormControl,FormArray } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { lastValueFrom } from "rxjs/internal/lastValueFrom";
import { Comunidad } from '../../../../customized/territorio/comunidad/model/comunidad';
import { ComunidadService } from '../../../../customized/territorio/comunidad/service/comunidad.service';
//PropSelectSearch
import { ComunidadPropSelectComponent } from '../../../../customized/territorio/comunidad/view/comunidad-prop-select.component';
import { ComunidadFilter } from '../../../../customized/territorio/comunidad/filter/comunidad-filter';
import { ComunidadNewComponent } from '../../../../customized/territorio/comunidad/view/comunidad-new.component';
import { ComunidadEditComponent } from '../../../../customized/territorio/comunidad/view/comunidad-edit.component';
import { ProvinciaService } from '../../../../customized/territorio/provincia/service/provincia.service';
import { Provincia } from '../../../../customized/territorio/provincia/model/provincia';  
import { ProvinciaBotoneraOpComponent } from '../../../../customized/territorio/provincia/view/provincia-botonera-op.component';

/**
 * Edición generada de la entidad Provincia
 * @implements {OnInit}
 */
@Component( {
    selector: 'app-generated-provincia-edit',
    templateUrl: './generated-provincia-edit.component.html'
} )
export class GeneratedProvinciaEditComponent extends GenericComponent<Provincia> implements OnInit {

  tabprovinciaCss:string="";
  protected comunidadService: ComunidadService;    
  protected provinciaOutlet!:string;
        
  protected comunidadRefs: Comunidad[]=[];     
  protected comunidadRefSelected!: any;
  protected isComunidadRefSelectedMultiple!: boolean;  
  protected comunidadRefPlaceholderText:string = this.translate.instant("global.propselect.placeholder",{ entidad: "Comunidad" });
  @ViewChild("comunidadCodigoElement") comunidadCodigoElement!: ElementRef<HTMLInputElement>;  
  @ViewChild("comunidadRefElement") comunidadRefElement!: ElementRef<HTMLInputElement>;   
  @ViewChild('provinciabotoneraop',{static:false}) provinciabotoneraop!: ProvinciaBotoneraOpComponent;    
  protected dataParent:any;
  protected editProvinciaId:any;
  protected provinciaEditForm!: FormGroup;
  @Input() provincia!: Provincia | null;  
  showGoToPrevious:boolean=true;
  
  constructor( 
    protected override renderer: Renderer2,
    protected override route: ActivatedRoute,
    protected override activeModal: NgbActiveModal,
    protected override modalService: NgbModal,    
    protected provinciaService: ProvinciaService
  ) {
    super(provinciaService, renderer, route, activeModal, '', 'provincia', true);
    this.comunidadService = this.injector.get(ComunidadService);      
  }
      
      
  override ngOnInit() {
    super.ngOnInit();
    this.origen='edit';
    this.embeddedEntity = true;
    this.provinciaOutlet = this.utilService.activeOutlet;
    if (!this.popupdetalle) {    
      this.setProvinciaEditId(); 
      super.getEntity(this.editProvinciaId).subscribe({
        next: (entity) => {
          this.initComponent(entity);
        },
        error: (e) => this.initComponent(new Provincia()),
        complete: () => {},
      });
    }  
    this.subscribes();    
  } 
  
  private setProvinciaEditId() {
    if (this.data && this.data.entity) {    
      this.editProvinciaId = this.data.entity.id.idEntidad+'/'+this.data.entity.id.idProvincia;
    }else{
        this.editProvinciaId = this.route.snapshot.paramMap.get( 'idEntidad' )+'/'+this.route.snapshot.paramMap.get( 'idProvincia' );
    }          
  }  
  
  /**
   * Subscriptions of Provincia
   * @returns void
   */  
  subscribes() {
  //Suscripciones a observables
  }       


  /**
   * unSubscriptions of Provincia
   * @returns void
   */    
  override unSubscribe(): void {
    //Libera suscripciones
  }  
  
  getEditTitle() {
    return this.translate.instant('provincia.editTitle');
  }
    
  updateFromDetalle(data?:any) {
    if (this.provinciaService.memory) {
      this.onSubmit();
    } else {
      this.ngOnInit();
    }
  }      
    
  initComponent( provincia:Provincia ) {
    this.provincia = provincia;  
    this.entity =  provincia;       
    this.setProvinciaEditForm();
    this.comunidadRefSelected = provincia.comunidadRef;
    this.handleDisabled();                                      
  }
  
    
  setProvinciaEditForm() {
    this.provinciaEditForm = this.fb.group( {
    type: new FormControl('provincia',[]),
    module: new FormControl('territorio',[]),
    id: new FormControl( this.provincia?.id, [] ),
    version: new FormControl( this.provincia?.version, [] ),
    comunidadRef: new FormControl(this.provincia?.comunidadRef, [Validators.required,JnumValidator.notOnlyWhiteSpaces] ),
    comunidadRefNombre: new FormControl(this.provincia?.comunidadRef?.nombre, [Validators.required,JnumValidator.notOnlyWhiteSpaces,Validators.maxLength(100)] ),
    comunidadCodigo: new FormControl(this.provincia?.comunidadRef?.codigo, [Validators.required,JnumValidator.notOnlyWhiteSpaces,JnumValidator.number,JnumValidator.positive,Validators.maxLength(2)] ),
    codigo: new FormControl(this.provincia?.codigo, [Validators.required,JnumValidator.notOnlyWhiteSpaces,JnumValidator.number,JnumValidator.positive,Validators.maxLength(2)] ),
    nombre: new FormControl(this.provincia?.nombre, [Validators.required,JnumValidator.notOnlyWhiteSpaces,Validators.maxLength(50)] ),
    nombreCorto: new FormControl(this.provincia?.nombreCorto, [Validators.maxLength(25)] ),
      }
      );   
    this.entityForm = this.provinciaEditForm;
    this.initialFormValues = this.entityForm.value;
  }   
     
  handleDisabled():void{
  }   
     
               
  get id() { return this.provinciaEditForm.get( 'id' ); }
  get version() { return this.provinciaEditForm.get( 'version' ); }
  get comunidadRef() { return this.provinciaEditForm.get('comunidadRef'); }
  get comunidadRefNombre() { return this.provinciaEditForm.get('comunidadRefNombre' ); }
  get comunidadCodigo() { return this.provinciaEditForm.get('comunidadCodigo'); }                                            
  get codigo() { return this.provinciaEditForm.get('codigo'); }
  get nombre() { return this.provinciaEditForm.get('nombre'); }
  get nombreCorto() { return this.provinciaEditForm.get('nombreCorto'); }


  override onSubmit($event?: any) {
    this.checkEnterOnTextArea($event);
    if (this.popupdetalle) {
      this.updateInPopup();
    } else {    
    const returnto = $event == "list" ? $event : null;
      super.onSubmitUpdate( this.provinciaEditForm,this.editProvinciaId, returnto);
    }           
  }  

  override updateInPopup() {
    if (this.provinciaEditForm.valid) {
      this.provincia = {
        ...this.provincia,
        ...this.provinciaEditForm.getRawValue(),
      };
      this.modifyEntityRelations(this.provincia);
      this.activeModal.close(this.provincia);
    } else {
      this.validationFormService.validateAllFormFields(this.provinciaEditForm);
    }
  }


                     
  searchComunidadRef() {    
    const dialogRef = this.modalService.open(ComunidadPropSelectComponent, MODAL_OPTIONS);   
    let data = this.setDataForComunidadRef();    
    dialogRef.componentInstance.data= data;        
    dialogRef.result.then((resultsearch) => {
      if (resultsearch){
        this.processResultForPropSelectComunidadRef(resultsearch);              
      } 
    });   
  }
  
  obtenerComunidadRefByComunidadCodigo($event:any){
    let comunidadCodigo = $event.target?$event.target.value:$event;
    this.comunidadRefSelected = null;
    if(!this.utilService.isNullOrUndefinedOrEmpty(comunidadCodigo)){
      const comunidadFilter = new ComunidadFilter();
      comunidadFilter.codigoeq = comunidadCodigo;
      this.obtenerComunidadRefFiltered(comunidadFilter,this.comunidadCodigoElement);
    } else {
	    this.clearComunidadRef();
      this.comunidadCodigoElement.nativeElement.focus();
      this.comunidadCodigoElement.nativeElement.value=''; 
    }
  }     
  obtenerComunidadRefByNombre($event: any) {
    let nombre = $event.target ? $event.target.value : $event;
    this.comunidadRefSelected = null;
    if (!this.utilService.isNullOrUndefinedOrEmpty(nombre)) {
      const comunidadFilter = new ComunidadFilter();
      comunidadFilter.nombreeq = nombre;
      this.obtenerComunidadRefFiltered(comunidadFilter,this.comunidadRefElement);
    } else {
      this.clearComunidadRef();     
      this.comunidadRefElement.nativeElement.focus();  
      this.comunidadRefElement.nativeElement.value='';   
    }
  }
  setDataForComunidadRefByFilters() {
    return {};
  }
  procesarComunidadRefObtenido(data:any){
    if (data.content.length > 1) {
      const dialogRef = this.modalService.open(ComunidadPropSelectComponent, MODAL_OPTIONS);   
      let data = this.setDataForComunidadRefByFilters();    
      dialogRef.componentInstance.data= data;        
      dialogRef.result.then((resultsearch) => {
        if (resultsearch){
          this.comunidadRefSelected = resultsearch;
          this.comunidadRef?.setValue(resultsearch);
          this.comunidadRefNombre?.setValue(resultsearch.nombre);
          this.comunidadCodigo?.setValue(resultsearch.codigo);
          this.processResultForPropSelectComunidadRef(resultsearch);              
        } 
        else {
          if (!this.comunidadRefSelected) {
              this.comunidadRefNombre?.setValue(null);
              this.comunidadCodigo?.setValue(null);
          }
        }
      });
    } else {
      this.comunidadRefSelected = data.content[0];
      this.comunidadRef?.setValue(this.comunidadRefSelected);
      this.comunidadRefNombre?.setValue(this.comunidadRefSelected?.nombre);
      this.comunidadCodigo?.setValue(this.comunidadRefSelected?.codigo);
    }
  }

  obtenerComunidadRefFiltered(comunidadFilter: ComunidadFilter,elementRef?: ElementRef) {
    this.comunidadService
      .searchEntitiesByFilterNoPaginated(comunidadFilter)
      .subscribe((data: any) => {
        if (data && !this.utilService.isEmptyList(data.content)) {
          this.procesarComunidadRefObtenido(data);
        } else {
          this.clearComunidadRef();
          elementRef?.nativeElement.focus();
          if(elementRef){
            elementRef.nativeElement.value = "";
          }
        }
      });
  }
  procesarComunidadRefByIdObtenido(data:any){
    this.comunidadRefSelected = data;
    this.comunidadRef?.setValue(this.comunidadRefSelected);
    this.comunidadRefNombre?.setValue(this.comunidadRefSelected?.nombre);
    this.comunidadCodigo?.setValue(this.comunidadRefSelected?.codigo);
  }
  
  obtenerComunidadRefById(id:any,elementRef?: ElementRef) {
    this.comunidadService
      .getEntity(id)
      .subscribe((data: any) => {
        if (data) {
          this.procesarComunidadRefByIdObtenido(data);
        } else {
          this.clearComunidadRef();
          elementRef?.nativeElement.focus();    
          if(elementRef){
            elementRef.nativeElement.value = "";
          }
        }
      });  
  }
 
    
  setDataForComunidadRef(): any{
    return {
      comunidadSelected: this.comunidadRefSelected
    };   
  }
    
  processResultForPropSelectComunidadRef(resultsearch: any) {
    if(this.provincia){
      this.provincia.comunidadRef = resultsearch;
      this.comunidadRefSelected = resultsearch;
    }    	
    this.isComunidadRefSelectedMultiple = !this.utilService.isEmptyList(resultsearch);   
    this.comunidadRef?.setValue(resultsearch); 
    this.comunidadRefNombre?.setValue(resultsearch.nombre);
    this.comunidadCodigo?.setValue(resultsearch.codigo);
  }    
    
  addComunidadRef() {
    const dialogRef = this.modalService.open(ComunidadNewComponent, MODAL_OPTIONS);
    let data = this.setDataForAddComunidadRef();
    dialogRef.componentInstance.data= data;       
    dialogRef.result.then((resultadd) => {
      if (resultadd){
        this.processResultForAddComunidadRef(resultadd);
      } 
    });    
  }
    
  setDataForAddComunidadRef(): any{
    return {
      pop: true
    }
  }    
    
  processResultForAddComunidadRef(resultadd:any){
  	 if(this.provincia){
      this.provincia.comunidadRef = resultadd;
     }    	
    this.comunidadCodigo?.setValue(resultadd.codigo);
  }

  editComunidadRef( comunidadref: Comunidad ) {
    if ( comunidadref ) {    
      const dialogRef = this.modalService.open(ComunidadEditComponent, MODAL_OPTIONS);
      let data = this.setDataForEditComunidadRef(comunidadref);
      dialogRef.componentInstance.data= data;           
      dialogRef.result.then((resultedit) => {
        if (resultedit){
          this.processResultForEditComunidadRef(resultedit);
        } 
      });
    }
  }    
    
  setDataForEditComunidadRef(comunidadRef:Comunidad):any{
    return  {
      pop: true,
      entity: comunidadRef
    }
  }    
    
  processResultForEditComunidadRef(resultedit:any){
   if(this.provincia){
    this.provincia.comunidadRef = resultedit;
    }     
    this.comunidadCodigo?.setValue(resultedit.codigo);
  }    
  
  
  deleteComunidadRef(comunidadref: Comunidad) {
    if ( comunidadref) {
      const dialogRef = this.modalService.open(
        GenericDialogComponent,
        MODAL_OPTIONS
      );

      const data = this.setDataForOpenDeleteDialogComunidadRef();
      dialogRef.componentInstance.data = data;
      
      dialogRef.result.then((result) => {
        if (result) {
          this.comunidadService.deleteEntity(this.utilService.getEntityId(comunidadref.id)).subscribe(() => {
            this.clearComunidadRef()
          });
        }
      });
    }
  }   
  

  setDataForOpenDeleteDialogComunidadRef(): any {
    return {
      titulo: this.translate.instant("global.eliminar"),
      content: this.translate.instant("global.eliminartxt"),
    };
  }  
  
  clearComunidadRef() {
   if(this.provincia){
    this.provincia.comunidadRef = null;
   }     
    this.comunidadRefSelected = null;
    this.comunidadRef?.setValue(null);
    this.comunidadRefNombre?.setValue(null);
    this.comunidadCodigo?.setValue(null);
  }
    codigoChange(){};

}

