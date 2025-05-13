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
import { PaisesService } from '../../../../customized/territorio/paises/service/paises.service';
import { Paises } from '../../../../customized/territorio/paises/model/paises';
import { PageModel } from "@jnum/jnum-core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IgmUtilService } from '../../../../jnum-core/services/igm-util.service';

/**
 * Listado generado de la entidad Paises
 * @implements {OnInit,AfterViewInit}
 */
@Component({
  selector: 'app-generated-paises-list',
  templateUrl: './generated-paises-list.component.html',
})
export class GeneratedPaisesListComponent extends GenericListComponent<Paises> implements OnInit, AfterViewInit {
  @ViewChild("tableresponsivePaises") scrollContent!: ElementRef;
  paisesOutlet!:string;
     
  override columnDefinitions = [                
    {
      idx:0, 
      column:'codigo',
      def: 'codigo',
      label: this.translate.instant('paises.codigo'),
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
      column:'digito',
      def: 'digito',
      label: this.translate.instant('paises.digito'),
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
      idx:2, 
      column:'nombre',
      def: 'nombre',
      label: this.translate.instant('paises.nombre'),
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
      column:'comunitario',
      def: 'comunitario',
      label: this.translate.instant('paises.comunitario'),
      headerclass:'',
      cellclass:'',
      masknumber:'',
      value: 'comunitario',
      type: 'checkbox',
      ordenacion: '',
      hasOrder:true,
      visible: true
    },        
    {
      idx:4, 
      column:'activo',
      def: 'activo',
      label: this.translate.instant('paises.activo'),
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
      idx:5, 
      column:'asimiladoAComunitario',
      def: 'asimiladoAComunitario',
      label: this.translate.instant('paises.asimiladoacomunitario'),
      headerclass:'',
      cellclass:'',
      masknumber:'',
      value: 'asimiladoAComunitario',
      type: 'checkbox',
      ordenacion: '',
      hasOrder:true,
      visible: true
    },        
  ];

  pageEvent!: PageEvent;
  @Output() paginatePaises:EventEmitter<any> = new EventEmitter<any>();


  protected paisesService: PaisesService;
  protected igmUtilService: IgmUtilService;


  constructor() {
    super();      
    this.paisesService = this.injector.get(PaisesService); 
    this.igmUtilService = this.injector.get(IgmUtilService); 
    this.listService = this.paisesService;
    this.nombreFilter = 'paisesFilter';
  }

  override ngOnInit() {
    super.ngOnInit();  
    this.scrollElement = this.scrollContent;
    this.paisesOutlet = this.utilService.activeOutlet;
  }

  override setXlsData() {    
    this.worksheetName = "Países";
    this.flatXlsData = this.flatXlsDataSource(this.dataSourceAux ?? []);
  }  

  override setPdfData() {    
    this.pdfName = "Países";
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
    
      

 
 
  override setSearchData(data: PaginationPage<Paises>): void {
    super.setSearchData(data);
    const resultinSessionStorage = sessionStorage.getItem(`paisesSort`);
    if (resultinSessionStorage) {
      this.setColumnDefintions(JSON.parse(resultinSessionStorage));
    }
  } 



}

