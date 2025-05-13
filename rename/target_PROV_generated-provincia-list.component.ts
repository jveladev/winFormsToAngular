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
import { ProvinciaService } from '../../../../customized/territorio/provincia/service/provincia.service';
import { Provincia } from '../../../../customized/territorio/provincia/model/provincia';
import { PageModel } from "@jnum/jnum-core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IgmUtilService } from '../../../../jnum-core/services/igm-util.service';

/**
 * Listado generado de la entidad Provincia
 * @implements {OnInit,AfterViewInit}
 */
@Component({
  selector: 'app-generated-provincia-list',
  templateUrl: './generated-provincia-list.component.html',
})
export class GeneratedProvinciaListComponent extends GenericListComponent<Provincia> implements OnInit, AfterViewInit {
  @ViewChild("tableresponsiveProvincia") scrollContent!: ElementRef;
  provinciaOutlet!:string;
     
  override columnDefinitions = [                
    {
      idx:0, 
      column:'codigo',
      def: 'codigo',
      label: this.translate.instant('provincia.codigo'),
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
      column:'nombre',
      def: 'nombre',
      label: this.translate.instant('provincia.nombre'),
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
      idx:2, 
      column:'nombreCorto',
      def: 'nombreCorto',
      label: this.translate.instant('provincia.nombrecorto'),
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
      idx:3, 
      column:'comunidad',
      def: 'comunidad',
      label: this.translate.instant('provincia.comunidad'),
      headerclass:'',
      cellclass:'',      
      masknumber:'',
      value: 'comunidad',
      type:'default',
      ordenacion: '',
      hasOrder:true,
      visible: true
    },              
  ];

  pageEvent!: PageEvent;
  @Output() paginateProvincia:EventEmitter<any> = new EventEmitter<any>();


  protected provinciaService: ProvinciaService;
  protected igmUtilService: IgmUtilService;


  constructor() {
    super();      
    this.provinciaService = this.injector.get(ProvinciaService); 
    this.igmUtilService = this.injector.get(IgmUtilService); 
    this.listService = this.provinciaService;
    this.nombreFilter = 'provinciaFilter';
  }

  override ngOnInit() {
    super.ngOnInit();  
    this.scrollElement = this.scrollContent;
    this.provinciaOutlet = this.utilService.activeOutlet;
  }

  override setXlsData() {    
    this.worksheetName = "Provincia";
    this.flatXlsData = this.flatXlsDataSource(this.dataSourceAux ?? []);
  }  

  override setPdfData() {    
    this.pdfName = "Provincia";
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
    
      

 
 
  override setSearchData(data: PaginationPage<Provincia>): void {
    super.setSearchData(data);
    const resultinSessionStorage = sessionStorage.getItem(`provinciaSort`);
    if (resultinSessionStorage) {
      this.setColumnDefintions(JSON.parse(resultinSessionStorage));
    }
  } 



}

