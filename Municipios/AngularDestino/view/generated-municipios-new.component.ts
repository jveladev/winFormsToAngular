import { Component, OnInit,OnDestroy, Input, ElementRef, ViewChild, Renderer2, Inject, Output, EventEmitter,AfterViewInit, AfterViewChecked,TemplateRef,ViewContainerRef,ComponentRef } from '@angular/core';
import { GenericDialogComponent,GenericComponent,SectionsMapService,MODAL_OPTIONS,ValidationFormService,AlertType,ToasterService,NavigationService,UtilService,JnumValidator,} from "@jnum/jnum-core";
import { FormBuilder, FormGroup, Validators, FormControl,FormArray } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { lastValueFrom } from "rxjs/internal/lastValueFrom";
import { Provincia } from '../../../../customized/territorio/provincia/model/provincia';
import { ProvinciaService } from '../../../../customized/territorio/provincia/service/provincia.service';
//PropSelectSearch
import { ProvinciaPropSelectComponent } from '../../../../customized/territorio/provincia/view/provincia-prop-select.component';
import { ProvinciaFilter } from '../../../../customized/territorio/provincia/filter/provincia-filter';
import { ProvinciaNewComponent } from '../../../../customized/territorio/provincia/view/provincia-new.component';
import { ProvinciaEditComponent } from '../../../../customized/territorio/provincia/view/provincia-edit.component';
import { MunicipiosService } from '../../../../customized/territorio/municipios/service/municipios.service';
import { Municipios } from '../../../../customized/territorio/municipios/model/municipios';  

/**
 * Creación generado de la entidad Municipios
 * @implements {OnInit}
 */
@Component( {
    selector: 'app-generated-municipios-new',
    templateUrl: './generated-municipios-new.component.html'
} )
export class GeneratedMunicipiosNewComponent extends GenericComponent<Municipios> implements OnInit {

  protected provinciaService: ProvinciaService;    
  protected municipiosOutlet!:string;
        
  protected provinciaRefs: Provincia[]=[];     
  protected provinciaRefSelected!: any;
  protected isProvinciaRefSelectedMultiple!: boolean;  
  protected provinciaRefPlaceholderText:string = this.translate.instant("global.propselect.placeholder",{ entidad: "Provincia" });
  @ViewChild("codigoProvinciaPropElement") codigoProvinciaPropElement!: ElementRef<HTMLInputElement>;  
  @ViewChild("provinciaRefElement") provinciaRefElement!: ElementRef<HTMLInputElement>;   


  @Output() closeModalEvent = new EventEmitter<any>();

  protected municipiosNewForm!: FormGroup; 
  protected newMunicipios: Municipios = new Municipios();


  constructor(
      protected override renderer: Renderer2,
      protected override route: ActivatedRoute,
      protected override activeModal: NgbActiveModal,
      protected override modalService: NgbModal,
      protected municipiosService: MunicipiosService
  ) {
    super(municipiosService, renderer, route, activeModal, 'territorio/municipios/municipiosedit','municipios', true);
    this.provinciaService = this.injector.get(ProvinciaService);      
  }

  override ngOnInit() {
    super.ngOnInit();
    this.origen='new';
    this.embeddedEntity = true;
    this.municipiosOutlet = this.utilService.activeOutlet;
    this.setMunicipiosNewForm();    
    this.handleDisabled();
    this.checkDetailsInModal();
  }
    
  setMunicipiosNewForm(): void {
    this.municipiosNewForm = this.fb.group({          
      type: new FormControl('municipios',[]),
      module: new FormControl('territorio',[]),
    provinciaRef: new FormControl({value:this.newMunicipios.provinciaRef,disabled:false}, [Validators.required,JnumValidator.notOnlyWhiteSpaces] ),
      provinciaRefNombre: new FormControl({value: this.newMunicipios.provinciaRef?.nombre,disabled: false}, [Validators.required,JnumValidator.notOnlyWhiteSpaces,Validators.maxLength(50)] ),
      codigoProvinciaProp: new FormControl({value: this.newMunicipios.provinciaRef?.codigo,disabled: false}, [Validators.required,JnumValidator.notOnlyWhiteSpaces,JnumValidator.number,JnumValidator.positive,Validators.maxLength(2)] ),
    nombre: new FormControl({value:this.newMunicipios.nombre,disabled:false}, [Validators.required,JnumValidator.notOnlyWhiteSpaces,Validators.maxLength(70)] ),
    codigoINE: new FormControl({value:this.newMunicipios.codigoINE,disabled:false}, [Validators.required,JnumValidator.notOnlyWhiteSpaces,JnumValidator.number,JnumValidator.positive,Validators.maxLength(3)] ),
    nombreCorto: new FormControl({value:this.newMunicipios.nombreCorto,disabled:false}, [Validators.maxLength(25)] ),
    codigoAEAT: new FormControl({value:this.newMunicipios.codigoAEAT,disabled:false}, [JnumValidator.positive,Validators.maxLength(5)] ),
    nombre50: new FormControl({value:this.newMunicipios.nombre50,disabled:false}, [Validators.maxLength(50)] ),
    digito: new FormControl({value:this.newMunicipios.digito,disabled:false}, [JnumValidator.number,Validators.maxLength(1)] ),
    activo: new FormControl({value: this.newMunicipios.activo?this.newMunicipios.activo:true,disabled:false}, [] ),
      }
    ); 
    this.entityForm = this.municipiosNewForm;
    this.initialFormValues = this.entityForm.value;
  }

   
  getNewTitle():string{
      return this.translate.instant('municipios.addTitle');
  }
    
  handleDisabled():void{
  } 
               

  initComponent(municipios:Municipios){};
  
  get idEntidad() { return this.municipiosNewForm.get( 'idEntidad' ); } 
  get idMunicipio() { return this.municipiosNewForm.get( 'idMunicipio' ); } 
      get provincia() { return this.municipiosNewForm.get( 'provincia' ); }
      get provinciaRef() { return this.municipiosNewForm.get( 'provinciaRef' ); }
      get provinciaRefNombre() { return this.municipiosNewForm.get('provinciaRefNombre' ); }

      get codigoProvinciaProp() { return this.municipiosNewForm.get( 'codigoProvinciaProp' ); }
      get nombre() { return this.municipiosNewForm.get( 'nombre' ); }
      get codigo() { return this.municipiosNewForm.get( 'codigo' ); }
      get codigoINE() { return this.municipiosNewForm.get( 'codigoINE' ); }
      get nombreCorto() { return this.municipiosNewForm.get( 'nombreCorto' ); }
      get codigoAEAT() { return this.municipiosNewForm.get( 'codigoAEAT' ); }
      get nombre50() { return this.municipiosNewForm.get( 'nombre50' ); }
      get digito() { return this.municipiosNewForm.get( 'digito' ); }
      get activo() { return this.municipiosNewForm.get( 'activo' ); }
      get mostrarNoActivos() { return this.municipiosNewForm.get( 'mostrarNoActivos' ); }
      get municipio() { return this.municipiosNewForm.get( 'municipio' ); }

    
  override onSubmit($event?:any) {
  	const returnto = $event == "list" || $event == "new" ? $event : null;
    this.checkEnterOnTextArea($event);
    super.onSubmitEmbedded(this.municipiosNewForm,this.newMunicipios,'municipios',this.municipiosOutlet,returnto);
             
  }    

 

  searchProvinciaRef() {    
    const dialogRef = this.modalService.open(ProvinciaPropSelectComponent, MODAL_OPTIONS);   
    let data = this.setDataForProvinciaRef();    
    dialogRef.componentInstance.data= data;        
    dialogRef.result.then((resultsearch) => {
      if (resultsearch){
        this.processResultForPropSelectProvinciaRef(resultsearch);              
      } 
    });   
  }
  
  obtenerProvinciaRefByCodigoProvinciaProp($event:any){
    let codigoProvinciaProp = $event.target?$event.target.value:$event;
    this.provinciaRefSelected = null;
    if(!this.utilService.isNullOrUndefinedOrEmpty(codigoProvinciaProp)){
      const provinciaFilter = new ProvinciaFilter();
      provinciaFilter.codigoeq = codigoProvinciaProp;
      this.obtenerProvinciaRefFiltered(provinciaFilter,this.codigoProvinciaPropElement);
    } else {
	    this.clearProvinciaRef();
      this.codigoProvinciaPropElement.nativeElement.focus();
      this.codigoProvinciaPropElement.nativeElement.value=''; 
    }
  }     
  obtenerProvinciaRefByNombre($event: any) {
    let nombre = $event.target ? $event.target.value : $event;
    this.provinciaRefSelected = null;
    if (!this.utilService.isNullOrUndefinedOrEmpty(nombre)) {
      const provinciaFilter = new ProvinciaFilter();
      provinciaFilter.nombreeq = nombre;
      this.obtenerProvinciaRefFiltered(provinciaFilter,this.provinciaRefElement);
    } else {
      this.clearProvinciaRef();     
      this.provinciaRefElement.nativeElement.focus();  
      this.provinciaRefElement.nativeElement.value='';   
    }
  }
  setDataForProvinciaRefByFilters() {
    return {};
  }
  procesarProvinciaRefObtenido(data:any){
    if (data.content.length > 1) {
      const dialogRef = this.modalService.open(ProvinciaPropSelectComponent, MODAL_OPTIONS);   
      let data = this.setDataForProvinciaRefByFilters();    
      dialogRef.componentInstance.data= data;        
      dialogRef.result.then((resultsearch) => {
        if (resultsearch){
          this.provinciaRefSelected = resultsearch;
          this.provinciaRef?.setValue(resultsearch);
          this.provinciaRefNombre?.setValue(resultsearch.nombre);
          this.codigoProvinciaProp?.setValue(resultsearch.codigo);
          this.processResultForPropSelectProvinciaRef(resultsearch);              
        } 
        else {
          if (!this.provinciaRefSelected) {
              this.provinciaRefNombre?.setValue(null);
              this.codigoProvinciaProp?.setValue(null);
          }
        }
      });
    } else {
      this.provinciaRefSelected = data.content[0];
      this.provinciaRef?.setValue(this.provinciaRefSelected);
      this.provinciaRefNombre?.setValue(this.provinciaRefSelected?.nombre);
      this.codigoProvinciaProp?.setValue(this.provinciaRefSelected?.codigo);
    }
  }

  obtenerProvinciaRefFiltered(provinciaFilter: ProvinciaFilter,elementRef?: ElementRef) {
    this.provinciaService
      .searchEntitiesByFilterNoPaginated(provinciaFilter)
      .subscribe((data: any) => {
        if (data && !this.utilService.isEmptyList(data.content)) {
          this.procesarProvinciaRefObtenido(data);
        } else {
          this.clearProvinciaRef();
          elementRef?.nativeElement.focus();
          if(elementRef){
            elementRef.nativeElement.value = "";
          }
        }
      });
  }
  procesarProvinciaRefByIdObtenido(data:any){
    this.provinciaRefSelected = data;
    this.provinciaRef?.setValue(this.provinciaRefSelected);
    this.provinciaRefNombre?.setValue(this.provinciaRefSelected?.nombre);
    this.codigoProvinciaProp?.setValue(this.provinciaRefSelected?.codigo);
  }
  
  obtenerProvinciaRefById(id:any,elementRef?: ElementRef) {
    this.provinciaService
      .getEntity(id)
      .subscribe((data: any) => {
        if (data) {
          this.procesarProvinciaRefByIdObtenido(data);
        } else {
          this.clearProvinciaRef();
          elementRef?.nativeElement.focus();    
          if(elementRef){
            elementRef.nativeElement.value = "";
          }
        }
      });  
  }
 
    
  setDataForProvinciaRef(): any{
    return {
      provinciaSelected: this.provinciaRefSelected
    };   
  }
    
  processResultForPropSelectProvinciaRef(resultsearch: any) {
    this.provinciaRefSelected = resultsearch;
    this.isProvinciaRefSelectedMultiple = !this.utilService.isEmptyList(resultsearch);   
    this.provinciaRef?.setValue(resultsearch); 
    this.provinciaRefNombre?.setValue(resultsearch.nombre);
    this.codigoProvinciaProp?.setValue(resultsearch.codigo);
  }    
    
  addProvinciaRef() {
    const dialogRef = this.modalService.open(ProvinciaNewComponent, MODAL_OPTIONS);
    let data = this.setDataForAddProvinciaRef();
    dialogRef.componentInstance.data= data;       
    dialogRef.result.then((resultadd) => {
      if (resultadd){
        this.processResultForAddProvinciaRef(resultadd);
      } 
    });    
  }
    
  setDataForAddProvinciaRef(): any{
    return {
      pop: true
    }
  }    
    
  processResultForAddProvinciaRef(resultadd:any){
    this.provinciaRefSelected = resultadd;
    this.codigoProvinciaProp?.setValue(resultadd.codigo);
  }

  editProvinciaRef( provinciaref: Provincia ) {
    if ( provinciaref ) {    
      const dialogRef = this.modalService.open(ProvinciaEditComponent, MODAL_OPTIONS);
      let data = this.setDataForEditProvinciaRef(provinciaref);
      dialogRef.componentInstance.data= data;           
      dialogRef.result.then((resultedit) => {
        if (resultedit){
          this.processResultForEditProvinciaRef(resultedit);
        } 
      });
    }
  }    
    
  setDataForEditProvinciaRef(provinciaRef:Provincia):any{
    return  {
      pop: true,
      entity: provinciaRef
    }
  }    
    
  processResultForEditProvinciaRef(resultedit:any){
    this.provinciaRefSelected = resultedit;
    this.codigoProvinciaProp?.setValue(resultedit.codigo);
  }    
  
  
  deleteProvinciaRef(provinciaref: Provincia) {
    if ( provinciaref) {
      const dialogRef = this.modalService.open(
        GenericDialogComponent,
        MODAL_OPTIONS
      );

      const data = this.setDataForOpenDeleteDialogProvinciaRef();
      dialogRef.componentInstance.data = data;
      
      dialogRef.result.then((result) => {
        if (result) {
          this.provinciaService.deleteEntity(this.utilService.getEntityId(provinciaref.id)).subscribe(() => {
            this.clearProvinciaRef()
          });
        }
      });
    }
  }   
  

  setDataForOpenDeleteDialogProvinciaRef(): any {
    return {
      titulo: this.translate.instant("global.eliminar"),
      content: this.translate.instant("global.eliminartxt"),
    };
  }  
  
  clearProvinciaRef() {
    this.provinciaRefSelected = null;
    this.provinciaRef?.setValue(null);
    this.provinciaRefNombre?.setValue(null);
    this.codigoProvinciaProp?.setValue(null);
  }
    codigoINEChange(){};
    codigoAEATChange(){};

  override clearPropSelects(): void {
    this.provinciaRefSelected = null;
    this.codigoProvinciaProp?.setValue(null);
  }
  



  override closeDetailModal() {
    this.closeModalEvent.emit(true);
  }


}



