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
import { ComunidadService } from '../../../../customized/territorio/comunidad/service/comunidad.service';
import { Comunidad } from '../../../../customized/territorio/comunidad/model/comunidad';
import { PageModel } from "@jnum/jnum-core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IgmUtilService } from '../../../../jnum-core/services/igm-util.service';

/**
 * Listado generado de la entidad Comunidad
 * @implements {OnInit,AfterViewInit}
 */
@Component({
  selector: 'app-generated-comunidad-list',
  templateUrl: './generated-comunidad-list.component.html',
})
export class GeneratedComunidadListComponent extends GenericListComponent<Comunidad> implements OnInit, AfterViewInit {
  @ViewChild("tableresponsiveComunidad") scrollContent!: ElementRef;
  comunidadOutlet!:string;
     
  override columnDefinitions = [                
    {
      idx:0, 
      column:'codigo',
      def: 'codigo',
      label: this.translate.instant('comunidad.codigo'),
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
      label: this.translate.instant('comunidad.nombre'),
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
      column:'organo',
      def: 'organo',
      label: this.translate.instant('comunidad.organo'),
      headerclass:'',
      cellclass:'',      
      masknumber:'',
      value: 'organo',
      type:'default',
      ordenacion: '',
      hasOrder:true,
      visible: true
    },              
  ];

  pageEvent!: PageEvent;
  @Output() paginateComunidad:EventEmitter<any> = new EventEmitter<any>();


  protected comunidadService: ComunidadService;
  protected igmUtilService: IgmUtilService;


  constructor() {
    super();      
    this.comunidadService = this.injector.get(ComunidadService); 
    this.igmUtilService = this.injector.get(IgmUtilService); 
    this.listService = this.comunidadService;
    this.nombreFilter = 'comunidadFilter';
  }

  override ngOnInit() {
    super.ngOnInit();  
    this.scrollElement = this.scrollContent;
    this.comunidadOutlet = this.utilService.activeOutlet;
  }

  override setXlsData() {    
    this.worksheetName = "Comunidad";
    this.flatXlsData = this.flatXlsDataSource(this.dataSourceAux ?? []);
  }  

  override setPdfData() {    
    this.pdfName = "Comunidad";
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
    
      

 
 
  override setSearchData(data: PaginationPage<Comunidad>): void {
    super.setSearchData(data);
    const resultinSessionStorage = sessionStorage.getItem(`comunidadSort`);
    if (resultinSessionStorage) {
      this.setColumnDefintions(JSON.parse(resultinSessionStorage));
    }
  } 



}

