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

/**
 * Creación generado de la entidad Provincia
 * @implements {OnInit}
 */
@Component( {
    selector: 'app-generated-provincia-new',
    templateUrl: './generated-provincia-new.component.html'
} )
export class GeneratedProvinciaNewComponent extends GenericComponent<Provincia> implements OnInit {

  protected comunidadService: ComunidadService;    
  protected provinciaOutlet!:string;
        
  protected comunidadRefs: Comunidad[]=[];     
  protected comunidadRefSelected!: any;
  protected isComunidadRefSelectedMultiple!: boolean;  
  protected comunidadRefPlaceholderText:string = this.translate.instant("global.propselect.placeholder",{ entidad: "Comunidad" });
  @ViewChild("comunidadCodigoElement") comunidadCodigoElement!: ElementRef<HTMLInputElement>;  
  @ViewChild("comunidadRefElement") comunidadRefElement!: ElementRef<HTMLInputElement>;   


  @Output() closeModalEvent = new EventEmitter<any>();

  protected provinciaNewForm!: FormGroup; 
  protected newProvincia: Provincia = new Provincia();


  constructor(
      protected override renderer: Renderer2,
      protected override route: ActivatedRoute,
      protected override activeModal: NgbActiveModal,
      protected override modalService: NgbModal,
      protected provinciaService: ProvinciaService
  ) {
    super(provinciaService, renderer, route, activeModal, 'territorio/provincia/provinciaedit','provincia', true);
    this.comunidadService = this.injector.get(ComunidadService);      
  }

  override ngOnInit() {
    super.ngOnInit();
    this.origen='new';
    this.embeddedEntity = true;
    this.provinciaOutlet = this.utilService.activeOutlet;
    this.setProvinciaNewForm();    
    this.handleDisabled();
    this.checkDetailsInModal();
  }
    
  setProvinciaNewForm(): void {
    this.provinciaNewForm = this.fb.group({          
      type: new FormControl('provincia',[]),
      module: new FormControl('territorio',[]),
    comunidadRef: new FormControl({value:this.newProvincia.comunidadRef,disabled:false}, [Validators.required,JnumValidator.notOnlyWhiteSpaces] ),
      comunidadRefNombre: new FormControl({value: this.newProvincia.comunidadRef?.nombre,disabled: false}, [Validators.required,JnumValidator.notOnlyWhiteSpaces,Validators.maxLength(100)] ),
      comunidadCodigo: new FormControl({value: this.newProvincia.comunidadRef?.codigo,disabled: false}, [Validators.required,JnumValidator.notOnlyWhiteSpaces,JnumValidator.number,JnumValidator.positive,Validators.maxLength(2)] ),
    codigo: new FormControl({value:this.newProvincia.codigo,disabled:false}, [Validators.required,JnumValidator.notOnlyWhiteSpaces,JnumValidator.number,JnumValidator.positive,Validators.maxLength(2)] ),
    nombre: new FormControl({value:this.newProvincia.nombre,disabled:false}, [Validators.required,JnumValidator.notOnlyWhiteSpaces,Validators.maxLength(50)] ),
    nombreCorto: new FormControl({value:this.newProvincia.nombreCorto,disabled:false}, [Validators.maxLength(25)] ),
      }
    ); 
    this.entityForm = this.provinciaNewForm;
    this.initialFormValues = this.entityForm.value;
  }

   
  getNewTitle():string{
      return this.translate.instant('provincia.addTitle');
  }
    
  handleDisabled():void{
  } 
               

  initComponent(provincia:Provincia){};
  
  get idEntidad() { return this.provinciaNewForm.get( 'idEntidad' ); } 
  get idProvincia() { return this.provinciaNewForm.get( 'idProvincia' ); } 
      get comunidad() { return this.provinciaNewForm.get( 'comunidad' ); }
      get comunidadRef() { return this.provinciaNewForm.get( 'comunidadRef' ); }
      get comunidadRefNombre() { return this.provinciaNewForm.get('comunidadRefNombre' ); }

      get comunidadCodigo() { return this.provinciaNewForm.get( 'comunidadCodigo' ); }
      get codigo() { return this.provinciaNewForm.get( 'codigo' ); }
      get nombre() { return this.provinciaNewForm.get( 'nombre' ); }
      get nombreCorto() { return this.provinciaNewForm.get( 'nombreCorto' ); }

    
  override onSubmit($event?:any) {
  	const returnto = $event == "list" || $event == "new" ? $event : null;
    this.checkEnterOnTextArea($event);
    super.onSubmitEmbedded(this.provinciaNewForm,this.newProvincia,'provincia',this.provinciaOutlet,returnto);
             
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
    this.comunidadRefSelected = resultsearch;
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
    this.comunidadRefSelected = resultadd;
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
    this.comunidadRefSelected = resultedit;
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
    this.comunidadRefSelected = null;
    this.comunidadRef?.setValue(null);
    this.comunidadRefNombre?.setValue(null);
    this.comunidadCodigo?.setValue(null);
  }
    codigoChange(){};

  override clearPropSelects(): void {
    this.comunidadRefSelected = null;
    this.comunidadCodigo?.setValue(null);
  }
  



  override closeDetailModal() {
    this.closeModalEvent.emit(true);
  }


}



