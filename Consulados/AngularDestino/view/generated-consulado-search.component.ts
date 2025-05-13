import { Component, OnInit,Output,EventEmitter,ViewChild,ElementRef,TemplateRef,ViewContainerRef,Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {
  GenericDialogComponent,
  ValidationFormService,
  GenericSearchComponent,
  UtilService,
  ToasterService,
  AlertType,
  JnumValidator,
  MODAL_OPTIONS,
  GenericSortDialogComponent,
  Sort,
} from "@jnum/jnum-core";
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageEvent } from "@jnum/jnum-core";
import { ConsuladoService } from '../../../../customized/territorio/consulado/service/consulado.service';
import { ConsuladoFilter } from '../../../../customized/territorio/consulado/filter/consulado-filter';
import { Consulado } from '../../../../customized/territorio/consulado/model/consulado';
import { environment } from '../../../../../environments/environment'
import { PageModel } from "@jnum/jnum-core";
import { Paises } from '../../../../customized/territorio/paises/model/paises';
import { PaisesService } from '../../../../customized/territorio/paises/service/paises.service';
import { Entidad } from '../../../../customized/administracion/entidad/model/entidad';
import { EntidadService } from '../../../../customized/administracion/entidad/service/entidad.service';
import { PaisesPropSelectComponent } from '../../../../customized/territorio/paises/view/paises-prop-select.component';
import { PaisesFilter } from '../../../../customized/territorio/paises/filter/paises-filter';
import { PaisesNewComponent } from '../../../../customized/territorio/paises/view/paises-new.component';
import { PaisesEditComponent } from '../../../../customized/territorio/paises/view/paises-edit.component';

/**
 * Búsqueda generada de la entidad Consulado
 * @implements {OnInit}
 */
@Component( {
    selector: 'app-generated-consulado-search',
    templateUrl: './generated-consulado-search.component.html'
} )
export class GeneratedConsuladoSearchComponent extends GenericSearchComponent<Consulado> implements OnInit {


    consuladoFilter: ConsuladoFilter = new ConsuladoFilter();
  
    paisrefs: Paises[]=[];
    idEntidads: Entidad[]=[];
  protected paisrefSelected!: any;
  @ViewChild("codigoPaisPropElement") codigoPaisPropElement!: ElementRef<HTMLInputElement>;  
  @ViewChild("paisrefElement") paisrefElement!: ElementRef<HTMLInputElement>;    
    constructor(
        public fb: FormBuilder,
        public consuladoService: ConsuladoService,
    public paisesService: PaisesService,
    public entidadService: EntidadService,
    ) {
        super();
        this.initializeParent();
    }
  
    protected initializeParent() {
        this.searchService = this.consuladoService;
        this.consuladoFilter = JSON.parse(
            sessionStorage.getItem("consuladoFilter") ?? "null"
        );
        if (!this.consuladoFilter) {
            this.consuladoFilter = new ConsuladoFilter();
            this.setFiltrosSubcampo();
        }
        this.searchFilter = this.consuladoFilter;
        this.nombreFilter = "consuladoFilter";
        this.nombreEntidad = "consulado";
    }    

    override ngOnInit() {
        this.setPropSelectValues();
    super.ngOnInit();
    }
    setSearchForm(): void {
        this.searchForm = this.fb.group({
      paisrefeq: new FormControl( this.consuladoFilter?this.consuladoFilter.paisrefeq:null, [] ),
      paisrefNombre: new FormControl(this.consuladoFilter?this.consuladoFilter?.paisrefeq?.nombre:null, [] ),
      codigoPaisPropeq: new FormControl( this.consuladoFilter?this.consuladoFilter.paisrefeq?.codigo:null, [JnumValidator.positive] ),
      nombreeq: new FormControl( this.consuladoFilter?this.consuladoFilter.nombreeq:null, [] ),
      consuladosNoActivoseq: new FormControl( this.consuladoFilter?this.consuladoFilter.consuladosNoActivoseq:null, [] ),
        }
        );
    }

    setPropSelectValues() {
        this.paisrefSelected=this.consuladoFilter.paisrefeq;
    }
  modifyFilter(consuladoFilter:ConsuladoFilter){  
  }
  

    setFiltrosSubcampo(){
    }
  get paisrefeq() { return this.searchForm.get( 'paisrefeq' ); }
  get paisrefNombre() { return this.searchForm.get('paisrefNombre' ); }
  get codigoPaisPropeq() { return this.searchForm.get( 'codigoPaisPropeq' ); }                            
  get nombreeq() { return this.searchForm.get( 'nombreeq' ); }
  get consuladosNoActivoseq() { return this.searchForm.get( 'consuladosNoActivoseq' ); }
    //Desarrollador: Con override puedes definir comportamiento con los datos que devuelve el propselect
    processResultForSearchPaisref(resultsearch: any): void {}
    
    searchPaisref() {
        const dialogRef = this.modalService.open(PaisesPropSelectComponent, MODAL_OPTIONS);
        let data = this.setDataForSearchPaisref();
        dialogRef.componentInstance.data= data;
        dialogRef.result.then((resultsearch) => {
            if(resultsearch){
                this.paisrefSelected = resultsearch;
                this.paisrefeq?.setValue(resultsearch);
                this.paisrefNombre?.setValue(resultsearch.nombre);
                this.codigoPaisPropeq?.setValue(resultsearch.codigo);
                this.processResultForSearchPaisref(resultsearch);
            }
             else {
                if (!this.paisrefSelected) {
                    this.paisrefNombre?.setValue(null);
                    this.codigoPaisPropeq?.setValue(null);
                }
            }
        }); 
    }
    
    setDataForSearchPaisref():any{
        return {
        }
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
          this.paisrefeq?.setValue(resultsearch);
          this.paisrefNombre?.setValue(resultsearch.nombre);
          this.codigoPaisPropeq?.setValue(resultsearch.codigo);
          this.processResultForSearchPaisref(resultsearch);              
        } 
        else {
          if (!this.paisrefSelected) {
              this.paisrefNombre?.setValue(null);
              this.codigoPaisPropeq?.setValue(null);
          }
        }
      });
    } else {
      this.paisrefSelected = data.content[0];
      this.paisrefeq?.setValue(this.paisrefSelected);
      this.paisrefNombre?.setValue(this.paisrefSelected?.nombre);
      this.codigoPaisPropeq?.setValue(this.paisrefSelected?.codigo);
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
    this.paisrefeq?.setValue(this.paisrefSelected);
    this.paisrefNombre?.setValue(this.paisrefSelected?.nombre);
    this.codigoPaisPropeq?.setValue(this.paisrefSelected?.codigo);
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
 
    addPaisref() {
        const dialogRef = this.modalService.open(PaisesNewComponent, MODAL_OPTIONS);
        let data = this.setDataForAddPaisref();
        dialogRef.componentInstance.data= data;
        dialogRef.result.then((resultadd) => {
            if(resultadd){
                this.paisrefSelected = resultadd;
            }
        });
    }
    
    setDataForAddPaisref():any{
        return {
            pop: true
        }
    }
    editPaisref( paisref: Paises ) {
        if ( paisref ) {
            const dialogRef = this.modalService.open(PaisesEditComponent, MODAL_OPTIONS);
            let data = this.setDataForEditPaisref(paisref);
            dialogRef.componentInstance.data= data;
            dialogRef.result.then((resultedit) => {
                if(resultedit){
                    this.paisrefSelected = resultedit;
                }
            });
        }
    }
    
    setDataForEditPaisref(paisref:Paises):any{
        return {
            pop: true,
            entity: paisref
        }
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

    clearPaisref(){
        this.paisrefSelected=null;
        this.paisrefeq?.setValue(null);
        this.paisrefNombre?.setValue(null);
        this.codigoPaisPropeq?.setValue(null);
    }
    codigoChange(): void {
        /*Implementación por desarrollador*/
    }
    idEntidadChange($event: any): void {
        /*Implementación por desarrollador*/
    }

    override clearPropSelects(): void {
    this.paisrefSelected = null;        
    this.codigoPaisPropeq?.setValue(null);
    }

  saveFilter() {
    const idAmbito = JSON.parse(
      sessionStorage.getItem("entity") || "{}"
    )?.idAmbito;    
    localStorage.setItem(
      `customConsuladoFilter_${idAmbito}`,
      JSON.stringify(this.searchForm.value)
    );    
  }

  restoreFilter() {
    const idAmbito = JSON.parse(
      sessionStorage.getItem("entity") || "{}"
    )?.idAmbito;
    const customFilter = JSON.parse(
      localStorage.getItem(`customConsuladoFilter_${idAmbito}`) ?? "null"
    );
    if (customFilter) {
      this.consuladoFilter = customFilter;
      sessionStorage.setItem("consuladoFilter", JSON.stringify(customFilter));
      this.setSearchForm();
    }
  }  

}
