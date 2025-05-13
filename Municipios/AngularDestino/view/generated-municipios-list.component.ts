import { AfterViewInit, Component, ElementRef, OnInit,Output,EventEmitter,ViewChild} from '@angular/core';
import { PageEvent } from "@jnum/jnum-core";
import { PaginationPage, PaginationPropertySort } from "@jnum/jnum-core";
import { UtilService } from "@jnum/jnum-core";
import { TranslateService } from '@ngx-translate/core';
import { ToasterService } from "@jnum/jnum-core";
import { GenericDialogComponent } from "@jnum/jnum-core";
import { MODAL_OPTIONS } from "@jnum/jnum-core";
import { AlertType } from "@jnum/jnum-core";
import { AuthorizationService} from "@jnum/jnum-core";
import { Router } from '@angular/router';
import { GenericListComponent } from "@jnum/jnum-core";
import { MunicipiosService } from '../../../../customized/territorio/municipios/service/municipios.service';
import { Municipios } from '../../../../customized/territorio/municipios/model/municipios';
import { PageModel } from "@jnum/jnum-core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IgmUtilService } from '../../../../jnum-core/services/igm-util.service';

/**
 * Listado generado de la entidad Municipios
 * @implements {OnInit,AfterViewInit}
 */
@Component({
  selector: 'app-generated-municipios-list',
  templateUrl: './generated-municipios-list.component.html',
})
export class GeneratedMunicipiosListComponent extends GenericListComponent<Municipios> implements OnInit, AfterViewInit {
  @ViewChild("tableresponsiveMunicipios") scrollContent!: ElementRef;
  municipiosOutlet!:string;
     
  override columnDefinitions = [                
    {
      idx:0, 
      column:'codigo',
      def: 'codigo',
      label: this.translate.instant('municipios.codigo'),
      headerclass:'',
      cellclass:'',      
      masknumber:'',
      value: 'codigo',
      type:'default',
      ordenacion: '',
      hasOrder:true,
      visible: true
    },              
    {
      idx:1, 
      column:'codigoINE',
      def: 'codigoINE',
      label: this.translate.instant('municipios.codigoine'),
      headerclass:'',
      cellclass:'',      
      masknumber:'',
      value: 'codigoINE',
      type:'default',
      ordenacion: '',
      hasOrder:true,
      visible: true
    },              
    {
      idx:2, 
      column:'nombre',
      def: 'nombre',
      label: this.translate.instant('municipios.nombre'),
      headerclass:'',
      cellclass:'',      
      masknumber:'',
      value: 'nombre',
      type:'default',
      ordenacion: '',
      hasOrder:true,
      visible: true
    },              
    {
      idx:3, 
      column:'provincia',
      def: 'provincia',
      label: this.translate.instant('municipios.provincia'),
      headerclass:'',
      cellclass:'',      
      masknumber:'',
      value: 'provincia',
      type:'default',
      ordenacion: '',
      hasOrder:true,
      visible: true
    },              
    {
      idx:4, 
      column:'digito',
      def: 'digito',
      label: this.translate.instant('municipios.digito'),
      headerclass:'',
      cellclass:'text-right',      
      masknumber:'',
      value: 'digito',
      type:'number',
      ordenacion: '',
      hasOrder:true,
      visible: true
    },              
    {
      idx:5, 
      column:'nombre50',
      def: 'nombre50',
      label: this.translate.instant('municipios.nombre50'),
      headerclass:'',
      cellclass:'',      
      masknumber:'',
      value: 'nombre50',
      type:'default',
      ordenacion: '',
      hasOrder:true,
      visible: true
    },              
    {
      idx:6, 
      column:'nombreCorto',
      def: 'nombreCorto',
      label: this.translate.instant('municipios.nombrecorto'),
      headerclass:'',
      cellclass:'',      
      masknumber:'',
      value: 'nombreCorto',
      type:'default',
      ordenacion: '',
      hasOrder:true,
      visible: true
    },              
    {
      idx:7, 
      column:'activo',
      def: 'activo',
      label: this.translate.instant('municipios.activo'),
      headerclass:'',
      cellclass:'',
      masknumber:'',
      value: 'activo',
      type: 'checkbox',
      ordenacion: '',
      hasOrder:true,
      visible: true
    },        
    {
      idx:8, 
      column:'codigoAEAT',
      def: 'codigoAEAT',
      label: this.translate.instant('municipios.codigoaeat'),
      headerclass:'',
      cellclass:'',      
      masknumber:'',
      value: 'codigoAEAT',
      type:'default',
      ordenacion: '',
      hasOrder:true,
      visible: true
    },              
  ];

  pageEvent!: PageEvent;
  @Output() paginateMunicipios:EventEmitter<any> = new EventEmitter<any>();


  protected municipiosService: MunicipiosService;
  protected igmUtilService: IgmUtilService;


  constructor() {
    super();      
    this.municipiosService = this.injector.get(MunicipiosService); 
    this.igmUtilService = this.injector.get(IgmUtilService); 
    this.listService = this.municipiosService;
    this.nombreFilter = 'municipiosFilter';
  }

  override ngOnInit() {
    super.ngOnInit();  
    this.scrollElement = this.scrollContent;
    this.municipiosOutlet = this.utilService.activeOutlet;
  }

  override setXlsData() {    
    this.worksheetName = "Municipios";
    this.flatXlsData = this.flatXlsDataSource(this.dataSourceAux ?? []);
  }  

  override setPdfData() {    
    this.pdfName = "Municipios";
    this.setPdfHeaders();
    this.flatPdfata = this.flatPdfDataSource(this.dataSourceAux ?? []);
  }   

  setPdfHeaders() {
    this.pdfHeaders = [];
    this.columnDefinitions.forEach((column: any) => {
      if (column.visible) {
        this.pdfHeaders.push(column.label);
      }
    });      
    return this.pdfHeaders;
  }  

  override generarPdf(): void {
    this.lastReport = 'Pdf';
    this.igmUtilService.generatePdf(
      this.pdfName,
      this.setPdfHeaders(),
      this.flatPdfDataSource(this.dataSourceAux)
    );
  }

  generarListado(): void {
    this.lastReport = 'List';
    this.igmUtilService.generatePdf(
      this.pdfName,
      this.setPdfHeaders(),
      this.flatPdfDataSource(this.dataSourceAux),
      "listado"
    );
  }


  ngAfterViewInit(): void {
    this.scrollElement = this.scrollContent;
    this.onResize();
  }  
    
      

 
 
  override setSearchData(data: PaginationPage<Municipios>): void {
    super.setSearchData(data);
    const resultinSessionStorage = sessionStorage.getItem(`municipiosSort`);
    if (resultinSessionStorage) {
      this.setColumnDefintions(JSON.parse(resultinSessionStorage));
    }
  } 



}

