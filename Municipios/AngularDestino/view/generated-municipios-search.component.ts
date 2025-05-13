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
import { MunicipiosService } from '../../../../customized/territorio/municipios/service/municipios.service';
import { MunicipiosFilter } from '../../../../customized/territorio/municipios/filter/municipios-filter';
import { Municipios } from '../../../../customized/territorio/municipios/model/municipios';
import { environment } from '../../../../../environments/environment'
import { PageModel } from "@jnum/jnum-core";
import { Provincia } from '../../../../customized/territorio/provincia/model/provincia';
import { ProvinciaService } from '../../../../customized/territorio/provincia/service/provincia.service';
import { ProvinciaPropSelectComponent } from '../../../../customized/territorio/provincia/view/provincia-prop-select.component';
import { ProvinciaFilter } from '../../../../customized/territorio/provincia/filter/provincia-filter';
import { ProvinciaNewComponent } from '../../../../customized/territorio/provincia/view/provincia-new.component';
import { ProvinciaEditComponent } from '../../../../customized/territorio/provincia/view/provincia-edit.component';

/**
 * Búsqueda generada de la entidad Municipios
 * @implements {OnInit}
 */
@Component( {
    selector: 'app-generated-municipios-search',
    templateUrl: './generated-municipios-search.component.html'
} )
export class GeneratedMunicipiosSearchComponent extends GenericSearchComponent<Municipios> implements OnInit {


    municipiosFilter: MunicipiosFilter = new MunicipiosFilter();
  
    provinciaRefs: Provincia[]=[];
  protected provinciaRefSelected!: any;
  @ViewChild("codigoProvinciaPropElement") codigoProvinciaPropElement!: ElementRef<HTMLInputElement>;  
  @ViewChild("provinciaRefElement") provinciaRefElement!: ElementRef<HTMLInputElement>;    
    constructor(
        public fb: FormBuilder,
        public municipiosService: MunicipiosService,
    public provinciaService: ProvinciaService,
    ) {
        super();
        this.initializeParent();
    }
  
    protected initializeParent() {
        this.searchService = this.municipiosService;
        this.municipiosFilter = JSON.parse(
            sessionStorage.getItem("municipiosFilter") ?? "null"
        );
        if (!this.municipiosFilter) {
            this.municipiosFilter = new MunicipiosFilter();
            this.setFiltrosSubcampo();
        }
        this.searchFilter = this.municipiosFilter;
        this.nombreFilter = "municipiosFilter";
        this.nombreEntidad = "municipios";
    }    

    override ngOnInit() {
        this.setPropSelectValues();
    super.ngOnInit();
    }
    setSearchForm(): void {
        this.searchForm = this.fb.group({
      provinciaRefeq: new FormControl( this.municipiosFilter?this.municipiosFilter.provinciaRefeq:null, [] ),
      provinciaRefNombre: new FormControl(this.municipiosFilter?this.municipiosFilter?.provinciaRefeq?.nombre:null, [] ),
      codigoProvinciaPropeq: new FormControl( this.municipiosFilter?this.municipiosFilter.provinciaRefeq?.codigo:null, [JnumValidator.positive] ),
      nombreeq: new FormControl( this.municipiosFilter?this.municipiosFilter.nombreeq:null, [] ),
      mostrarNoActivoseq: new FormControl( this.municipiosFilter?this.municipiosFilter.mostrarNoActivoseq:null, [] ),
        }
        );
    }

    setPropSelectValues() {
        this.provinciaRefSelected=this.municipiosFilter.provinciaRefeq;
    }
  modifyFilter(municipiosFilter:MunicipiosFilter){  
  }
  

    setFiltrosSubcampo(){
    }
  get provinciaRefeq() { return this.searchForm.get( 'provinciaRefeq' ); }
  get provinciaRefNombre() { return this.searchForm.get('provinciaRefNombre' ); }
  get codigoProvinciaPropeq() { return this.searchForm.get( 'codigoProvinciaPropeq' ); }                            
  get nombreeq() { return this.searchForm.get( 'nombreeq' ); }
  get mostrarNoActivoseq() { return this.searchForm.get( 'mostrarNoActivoseq' ); }
    //Desarrollador: Con override puedes definir comportamiento con los datos que devuelve el propselect
    processResultForSearchProvinciaRef(resultsearch: any): void {}
    
    searchProvinciaRef() {
        const dialogRef = this.modalService.open(ProvinciaPropSelectComponent, MODAL_OPTIONS);
        let data = this.setDataForSearchProvinciaRef();
        dialogRef.componentInstance.data= data;
        dialogRef.result.then((resultsearch) => {
            if(resultsearch){
                this.provinciaRefSelected = resultsearch;
                this.provinciaRefeq?.setValue(resultsearch);
                this.provinciaRefNombre?.setValue(resultsearch.nombre);
                this.codigoProvinciaPropeq?.setValue(resultsearch.codigo);
                this.processResultForSearchProvinciaRef(resultsearch);
            }
             else {
                if (!this.provinciaRefSelected) {
                    this.provinciaRefNombre?.setValue(null);
                    this.codigoProvinciaPropeq?.setValue(null);
                }
            }
        }); 
    }
    
    setDataForSearchProvinciaRef():any{
        return {
        }
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
          this.provinciaRefeq?.setValue(resultsearch);
          this.provinciaRefNombre?.setValue(resultsearch.nombre);
          this.codigoProvinciaPropeq?.setValue(resultsearch.codigo);
          this.processResultForSearchProvinciaRef(resultsearch);              
        } 
        else {
          if (!this.provinciaRefSelected) {
              this.provinciaRefNombre?.setValue(null);
              this.codigoProvinciaPropeq?.setValue(null);
          }
        }
      });
    } else {
      this.provinciaRefSelected = data.content[0];
      this.provinciaRefeq?.setValue(this.provinciaRefSelected);
      this.provinciaRefNombre?.setValue(this.provinciaRefSelected?.nombre);
      this.codigoProvinciaPropeq?.setValue(this.provinciaRefSelected?.codigo);
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
    this.provinciaRefeq?.setValue(this.provinciaRefSelected);
    this.provinciaRefNombre?.setValue(this.provinciaRefSelected?.nombre);
    this.codigoProvinciaPropeq?.setValue(this.provinciaRefSelected?.codigo);
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
 
    addProvinciaRef() {
        const dialogRef = this.modalService.open(ProvinciaNewComponent, MODAL_OPTIONS);
        let data = this.setDataForAddProvinciaRef();
        dialogRef.componentInstance.data= data;
        dialogRef.result.then((resultadd) => {
            if(resultadd){
                this.provinciaRefSelected = resultadd;
            }
        });
    }
    
    setDataForAddProvinciaRef():any{
        return {
            pop: true
        }
    }
    editProvinciaRef( provinciaref: Provincia ) {
        if ( provinciaref ) {
            const dialogRef = this.modalService.open(ProvinciaEditComponent, MODAL_OPTIONS);
            let data = this.setDataForEditProvinciaRef(provinciaref);
            dialogRef.componentInstance.data= data;
            dialogRef.result.then((resultedit) => {
                if(resultedit){
                    this.provinciaRefSelected = resultedit;
                }
            });
        }
    }
    
    setDataForEditProvinciaRef(provinciaRef:Provincia):any{
        return {
            pop: true,
            entity: provinciaRef
        }
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

    clearProvinciaRef(){
        this.provinciaRefSelected=null;
        this.provinciaRefeq?.setValue(null);
        this.provinciaRefNombre?.setValue(null);
        this.codigoProvinciaPropeq?.setValue(null);
    }
    codigoINEChange(): void {
        /*Implementación por desarrollador*/
    }
    codigoAEATChange(): void {
        /*Implementación por desarrollador*/
    }

    override clearPropSelects(): void {
    this.provinciaRefSelected = null;        
    this.codigoProvinciaPropeq?.setValue(null);
    }

  saveFilter() {
    const idAmbito = JSON.parse(
      sessionStorage.getItem("entity") || "{}"
    )?.idAmbito;    
    localStorage.setItem(
      `customMunicipiosFilter_${idAmbito}`,
      JSON.stringify(this.searchForm.value)
    );    
  }

  restoreFilter() {
    const idAmbito = JSON.parse(
      sessionStorage.getItem("entity") || "{}"
    )?.idAmbito;
    const customFilter = JSON.parse(
      localStorage.getItem(`customMunicipiosFilter_${idAmbito}`) ?? "null"
    );
    if (customFilter) {
      this.municipiosFilter = customFilter;
      sessionStorage.setItem("municipiosFilter", JSON.stringify(customFilter));
      this.setSearchForm();
    }
  }  

}
