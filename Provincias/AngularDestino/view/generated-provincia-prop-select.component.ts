import { Component, OnInit, Output, EventEmitter, Inject,ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericPropSelectComponent, JnumCoreModule, JnumValidator } from "@jnum/jnum-core";
import { ProvinciaFilter } from '../../../../customized/territorio/provincia/filter/provincia-filter';
import { ProvinciaService } from '../../../../customized/territorio/provincia/service/provincia.service';
import { Provincia } from '../../../../customized/territorio/provincia/model/provincia';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

import { ProvinciaModule } from '../../../../customized/territorio/provincia/provincia.module';
import { FiltrosComponent } from "../../../../jnum-core/filtros/filtros.component";
import { IgmUtilService } from '../../../../jnum-core/services/igm-util.service';


export const generatedPropSelectImports = [
  TranslateModule,
  JnumCoreModule,
  CommonModule,
  ReactiveFormsModule,
  ProvinciaModule,
  FiltrosComponent,
];


/**
 * PropSelect generado de la entidad Provincia
 * @implements {OnInit}
 */
@Component({
  standalone: true,
  imports: generatedPropSelectImports,
  selector: 'app-generated-provincia-prop-select',
  templateUrl: './generated-provincia-prop-select.component.html'
})
export class GeneratedProvinciaPropSelectComponent extends GenericPropSelectComponent<Provincia> implements OnInit {



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
   

  protected provinciaService: ProvinciaService;


  constructor(
    protected override activeModal: NgbActiveModal,
    protected override fb: FormBuilder,
    protected override route: ActivatedRoute,
    protected igmUtilService: IgmUtilService,
  ) {
    super(activeModal, fb, route);
    this.provinciaService = this.injector.get(ProvinciaService); 
    this.listService = this.provinciaService;
    this.listFilter = new ProvinciaFilter();
    this.nombreFilter = 'provinciaPropFilter';  
    this.nombreEntidad = "provincia";
  }
  
  override ngOnInit() {
    super.ngOnInit();  
  }  

    
  setSearchForm():void{
    this.searchPropForm = this.fb.group( {
      codigoeq: new FormControl( this.listFilter ? this.listFilter.codigoeq : null,[] ),
      nombreeq: new FormControl( this.listFilter ? this.listFilter.nombreeq : null,[] ),
      nombreCortoeq: new FormControl( this.listFilter ? this.listFilter.nombreCortoeq : null,[] ),
      comunidadeq: new FormControl( this.listFilter ? this.listFilter.comunidadeq : null,[] ),
    });
  }
   
       
       


  override processSearchDataForFront(data: any) {
    this.dataSourceTotal = data.content;
    this.flatXlsData = this.flatXlsDataSource(this.dataSourceTotal ?? []);
    super.processSearchDataForFront(data);
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
}
