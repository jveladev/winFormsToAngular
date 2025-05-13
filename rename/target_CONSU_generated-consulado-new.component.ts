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

/**
 * Creación generado de la entidad Consulado
 * @implements {OnInit}
 */
@Component( {
    selector: 'app-generated-consulado-new',
    templateUrl: './generated-consulado-new.component.html'
} )
export class GeneratedConsuladoNewComponent extends GenericComponent<Consulado> implements OnInit {

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


  @Output() closeModalEvent = new EventEmitter<any>();

  protected consuladoNewForm!: FormGroup; 
  protected newConsulado: Consulado = new Consulado();


  constructor(
      protected override renderer: Renderer2,
      protected override route: ActivatedRoute,
      protected override activeModal: NgbActiveModal,
      protected override modalService: NgbModal,
      protected consuladoService: ConsuladoService
  ) {
    super(consuladoService, renderer, route, activeModal, 'territorio/consulado/consuladoedit','consulado', true);
    this.paisesService = this.injector.get(PaisesService);      
    this.entidadService = this.injector.get(EntidadService);      
  }

  override ngOnInit() {
    super.ngOnInit();
    this.origen='new';
    this.embeddedEntity = true;
    this.consuladoOutlet = this.utilService.activeOutlet;
    this.setConsuladoNewForm();    
    this.handleDisabled();
    this.checkDetailsInModal();
  }
    
  setConsuladoNewForm(): void {
    this.consuladoNewForm = this.fb.group({          
      type: new FormControl('consulado',[]),
      module: new FormControl('territorio',[]),
      idEntidad: new FormControl('', [] ),
      idConsulado: new FormControl('', [] ),
    paisref: new FormControl({value:this.newConsulado.paisref,disabled:false}, [Validators.required,JnumValidator.notOnlyWhiteSpaces] ),
      paisrefNombre: new FormControl({value: this.newConsulado.paisref?.nombre,disabled: false}, [Validators.required,JnumValidator.notOnlyWhiteSpaces,Validators.maxLength(250)] ),
      codigoPaisProp: new FormControl({value: this.newConsulado.paisref?.codigo,disabled: false}, [Validators.required,JnumValidator.notOnlyWhiteSpaces,JnumValidator.number,JnumValidator.positive,Validators.maxLength(3)] ),
    codigo: new FormControl({value:this.newConsulado.codigo,disabled:false}, [Validators.required,JnumValidator.notOnlyWhiteSpaces,JnumValidator.number,JnumValidator.positive,Validators.maxLength(3)] ),
    nombre: new FormControl({value:this.newConsulado.nombre,disabled:false}, [Validators.required,JnumValidator.notOnlyWhiteSpaces,Validators.maxLength(250)] ),
    activo: new FormControl({value: this.newConsulado.activo?this.newConsulado.activo:true,disabled:false}, [] ),
      }
    ); 
    this.entityForm = this.consuladoNewForm;
    this.initialFormValues = this.entityForm.value;
  }

   
  getNewTitle():string{
      return this.translate.instant('consulado.addTitle');
  }
    
  handleDisabled():void{
  } 
               

  initComponent(consulado:Consulado){};
  
  get idEntidad() { return this.consuladoNewForm.get( 'idEntidad' ); } 
  get idConsulado() { return this.consuladoNewForm.get( 'idConsulado' ); } 
      get paisref() { return this.consuladoNewForm.get( 'paisref' ); }
      get paisrefNombre() { return this.consuladoNewForm.get('paisrefNombre' ); }

      get codigoPaisProp() { return this.consuladoNewForm.get( 'codigoPaisProp' ); }
      get codPais() { return this.consuladoNewForm.get( 'codPais' ); }
      get nombrePais() { return this.consuladoNewForm.get( 'nombrePais' ); }
      get codigo() { return this.consuladoNewForm.get( 'codigo' ); }
      get nombre() { return this.consuladoNewForm.get( 'nombre' ); }
      get activo() { return this.consuladoNewForm.get( 'activo' ); }
      get consuladosNoActivos() { return this.consuladoNewForm.get( 'consuladosNoActivos' ); }

    
  override onSubmit($event?:any) {
  	const returnto = $event == "list" || $event == "new" ? $event : null;
    this.checkEnterOnTextArea($event);
    super.onSubmitEmbedded(this.consuladoNewForm,this.newConsulado,'consulado',this.consuladoOutlet,returnto);
             
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
    this.paisrefSelected = resultsearch;
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
    this.paisrefSelected = resultadd;
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
    this.paisrefSelected = resultedit;
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
    this.paisrefSelected = null;
    this.paisref?.setValue(null);
    this.paisrefNombre?.setValue(null);
    this.codigoPaisProp?.setValue(null);
  }
    codigoChange(){};

  override clearPropSelects(): void {
    this.paisrefSelected = null;
    this.codigoPaisProp?.setValue(null);
  }
  



  override closeDetailModal() {
    this.closeModalEvent.emit(true);
  }


}



