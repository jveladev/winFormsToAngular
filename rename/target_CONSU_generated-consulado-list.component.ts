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
import { ConsuladoService } from '../../../../customized/territorio/consulado/service/consulado.service';
import { Consulado } from '../../../../customized/territorio/consulado/model/consulado';
import { PageModel } from "@jnum/jnum-core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IgmUtilService } from '../../../../jnum-core/services/igm-util.service';

/**
 * Listado generado de la entidad Consulado
 * @implements {OnInit,AfterViewInit}
 */
@Component({
  selector: 'app-generated-consulado-list',
  templateUrl: './generated-consulado-list.component.html',
})
export class GeneratedConsuladoListComponent extends GenericListComponent<Consulado> implements OnInit, AfterViewInit {
  @ViewChild("tableresponsiveConsulado") scrollContent!: ElementRef;
  consuladoOutlet!:string;
     
  override columnDefinitions = [                
    {
      idx:0, 
      column:'codPais',
      def: 'codPais',
      label: this.translate.instant('consulado.codpais'),
      headerclass:'',
      cellclass:'',      
      masknumber:'',
      value: 'codPais',
      type:'default',
      ordenacion: '',
      hasOrder:true,
      visible: true
    },              
    {
      idx:1, 
      column:'nombrePais',
      def: 'nombrePais',
      label: this.translate.instant('consulado.nombrepais'),
      headerclass:'',
      cellclass:'',      
      masknumber:'',
      value: 'nombrePais',
      type:'default',
      ordenacion: '',
      hasOrder:true,
      visible: true
    },              
    {
      idx:2, 
      column:'codigo',
      def: 'codigo',
      label: this.translate.instant('consulado.codigo'),
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
      idx:3, 
      column:'nombre',
      def: 'nombre',
      label: this.translate.instant('consulado.nombre'),
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
      idx:4, 
      column:'activo',
      def: 'activo',
      label: this.translate.instant('consulado.activo'),
      headerclass:'',
      cellclass:'',
      masknumber:'',
      value: 'activo',
      type: 'checkbox',
      ordenacion: '',
      hasOrder:true,
      visible: true
    },        
  ];

  pageEvent!: PageEvent;
  @Output() paginateConsulado:EventEmitter<any> = new EventEmitter<any>();


  protected consuladoService: ConsuladoService;
  protected igmUtilService: IgmUtilService;


  constructor() {
    super();      
    this.consuladoService = this.injector.get(ConsuladoService); 
    this.igmUtilService = this.injector.get(IgmUtilService); 
    this.listService = this.consuladoService;
    this.nombreFilter = 'consuladoFilter';
  }

  override ngOnInit() {
    super.ngOnInit();  
    this.scrollElement = this.scrollContent;
    this.consuladoOutlet = this.utilService.activeOutlet;
  }

  override setXlsData() {    
    this.worksheetName = "Consulado";
    this.flatXlsData = this.flatXlsDataSource(this.dataSourceAux ?? []);
  }  

  override setPdfData() {    
    this.pdfName = "Consulado";
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
    
      

 
 
  override setSearchData(data: PaginationPage<Consulado>): void {
    super.setSearchData(data);
    const resultinSessionStorage = sessionStorage.getItem(`consuladoSort`);
    if (resultinSessionStorage) {
      this.setColumnDefintions(JSON.parse(resultinSessionStorage));
    }
  } 



}

