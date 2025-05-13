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
import { MunicipiosBotoneraOpComponent } from '../../../../customized/territorio/municipios/view/municipios-botonera-op.component';

/**
 * Edición generada de la entidad Municipios
 * @implements {OnInit}
 */
@Component( {
    selector: 'app-generated-municipios-edit',
    templateUrl: './generated-municipios-edit.component.html'
} )
export class GeneratedMunicipiosEditComponent extends GenericComponent<Municipios> implements OnInit {

  tabmunicipiosCss:string="";
  protected provinciaService: ProvinciaService;    
  protected municipiosOutlet!:string;
        
  protected provinciaRefs: Provincia[]=[];     
  protected provinciaRefSelected!: any;
  protected isProvinciaRefSelectedMultiple!: boolean;  
  protected provinciaRefPlaceholderText:string = this.translate.instant("global.propselect.placeholder",{ entidad: "Provincia" });
  @ViewChild("codigoProvinciaPropElement") codigoProvinciaPropElement!: ElementRef<HTMLInputElement>;  
  @ViewChild("provinciaRefElement") provinciaRefElement!: ElementRef<HTMLInputElement>;   
  @ViewChild('municipiosbotoneraop',{static:false}) municipiosbotoneraop!: MunicipiosBotoneraOpComponent;    
  protected dataParent:any;
  protected editMunicipiosId:any;
  protected municipiosEditForm!: FormGroup;
  @Input() municipios!: Municipios | null;  
  showGoToPrevious:boolean=true;
  
  constructor( 
    protected override renderer: Renderer2,
    protected override route: ActivatedRoute,
    protected override activeModal: NgbActiveModal,
    protected override modalService: NgbModal,    
    protected municipiosService: MunicipiosService
  ) {
    super(municipiosService, renderer, route, activeModal, '', 'municipios', true);
    this.provinciaService = this.injector.get(ProvinciaService);      
  }
      
      
  override ngOnInit() {
    super.ngOnInit();
    this.origen='edit';
    this.embeddedEntity = true;
    this.municipiosOutlet = this.utilService.activeOutlet;
    if (!this.popupdetalle) {    
      this.setMunicipiosEditId(); 
      super.getEntity(this.editMunicipiosId).subscribe({
        next: (entity) => {
          this.initComponent(entity);
        },
        error: (e) => this.initComponent(new Municipios()),
        complete: () => {},
      });
    }  
    this.subscribes();    
  } 
  
  private setMunicipiosEditId() {
    if (this.data && this.data.entity) {    
      this.editMunicipiosId = this.data.entity.id.idEntidad+'/'+this.data.entity.id.idMunicipio;
    }else{
        this.editMunicipiosId = this.route.snapshot.paramMap.get( 'idEntidad' )+'/'+this.route.snapshot.paramMap.get( 'idMunicipio' );
    }          
  }  
  
  /**
   * Subscriptions of Municipios
   * @returns void
   */  
  subscribes() {
  //Suscripciones a observables
  }       


  /**
   * unSubscriptions of Municipios
   * @returns void
   */    
  override unSubscribe(): void {
    //Libera suscripciones
  }  
  
  getEditTitle() {
    return this.translate.instant('municipios.editTitle');
  }
    
  updateFromDetalle(data?:any) {
    if (this.municipiosService.memory) {
      this.onSubmit();
    } else {
      this.ngOnInit();
    }
  }      
    
  initComponent( municipios:Municipios ) {
    this.municipios = municipios;  
    this.entity =  municipios;       
    this.setMunicipiosEditForm();
    this.provinciaRefSelected = municipios.provinciaRef;
    this.handleDisabled();                                      
  }
  
    
  setMunicipiosEditForm() {
    this.municipiosEditForm = this.fb.group( {
    type: new FormControl('municipios',[]),
    module: new FormControl('territorio',[]),
    id: new FormControl( this.municipios?.id, [] ),
    version: new FormControl( this.municipios?.version, [] ),
    provinciaRef: new FormControl(this.municipios?.provinciaRef, [Validators.required,JnumValidator.notOnlyWhiteSpaces] ),
    provinciaRefNombre: new FormControl(this.municipios?.provinciaRef?.nombre, [Validators.required,JnumValidator.notOnlyWhiteSpaces,Validators.maxLength(50)] ),
    codigoProvinciaProp: new FormControl(this.municipios?.provinciaRef?.codigo, [Validators.required,JnumValidator.notOnlyWhiteSpaces,JnumValidator.number,JnumValidator.positive,Validators.maxLength(2)] ),
    activo: new FormControl(this.municipios?.activo, [] ),
    codigoINE: new FormControl(this.municipios?.codigoINE, [Validators.required,JnumValidator.notOnlyWhiteSpaces,JnumValidator.number,JnumValidator.positive,Validators.maxLength(3)] ),
    digito: new FormControl(this.municipios?.digito, [JnumValidator.number,Validators.maxLength(1)] ),
    codigoAEAT: new FormControl(this.municipios?.codigoAEAT, [JnumValidator.positive,Validators.maxLength(5)] ),
    nombre: new FormControl(this.municipios?.nombre, [Validators.required,JnumValidator.notOnlyWhiteSpaces,Validators.maxLength(70)] ),
    nombreCorto: new FormControl(this.municipios?.nombreCorto, [Validators.maxLength(25)] ),
    nombre50: new FormControl(this.municipios?.nombre50, [Validators.maxLength(50)] ),
      }
      );   
    this.entityForm = this.municipiosEditForm;
    this.initialFormValues = this.entityForm.value;
  }   
     
  handleDisabled():void{
  }   
     
               
  get id() { return this.municipiosEditForm.get( 'id' ); }
  get version() { return this.municipiosEditForm.get( 'version' ); }
  get provinciaRef() { return this.municipiosEditForm.get('provinciaRef'); }
  get provinciaRefNombre() { return this.municipiosEditForm.get('provinciaRefNombre' ); }
  get codigoProvinciaProp() { return this.municipiosEditForm.get('codigoProvinciaProp'); }                                            
  get activo() { return this.municipiosEditForm.get('activo'); }
  get codigoINE() { return this.municipiosEditForm.get('codigoINE'); }
  get digito() { return this.municipiosEditForm.get('digito'); }
  get codigoAEAT() { return this.municipiosEditForm.get('codigoAEAT'); }
  get nombre() { return this.municipiosEditForm.get('nombre'); }
  get nombreCorto() { return this.municipiosEditForm.get('nombreCorto'); }
  get nombre50() { return this.municipiosEditForm.get('nombre50'); }


  override onSubmit($event?: any) {
    this.checkEnterOnTextArea($event);
    if (this.popupdetalle) {
      this.updateInPopup();
    } else {    
    const returnto = $event == "list" ? $event : null;
      super.onSubmitUpdate( this.municipiosEditForm,this.editMunicipiosId, returnto);
    }           
  }  

  override updateInPopup() {
    if (this.municipiosEditForm.valid) {
      this.municipios = {
        ...this.municipios,
        ...this.municipiosEditForm.getRawValue(),
      };
      this.modifyEntityRelations(this.municipios);
      this.activeModal.close(this.municipios);
    } else {
      this.validationFormService.validateAllFormFields(this.municipiosEditForm);
    }
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
    if(this.municipios){
      this.municipios.provinciaRef = resultsearch;
      this.provinciaRefSelected = resultsearch;
    }    	
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
  	 if(this.municipios){
      this.municipios.provinciaRef = resultadd;
     }    	
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
   if(this.municipios){
    this.municipios.provinciaRef = resultedit;
    }     
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
   if(this.municipios){
    this.municipios.provinciaRef = null;
   }     
    this.provinciaRefSelected = null;
    this.provinciaRef?.setValue(null);
    this.provinciaRefNombre?.setValue(null);
    this.codigoProvinciaProp?.setValue(null);
  }
    codigoINEChange(){};
    codigoAEATChange(){};

}

