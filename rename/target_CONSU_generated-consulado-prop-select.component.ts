import { Component, OnInit, Output, EventEmitter, Inject,ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericPropSelectComponent, JnumCoreModule, JnumValidator } from "@jnum/jnum-core";
import { ConsuladoFilter } from '../../../../customized/territorio/consulado/filter/consulado-filter';
import { ConsuladoService } from '../../../../customized/territorio/consulado/service/consulado.service';
import { Consulado } from '../../../../customized/territorio/consulado/model/consulado';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

import { ConsuladoModule } from '../../../../customized/territorio/consulado/consulado.module';
import { FiltrosComponent } from "../../../../jnum-core/filtros/filtros.component";
import { IgmUtilService } from '../../../../jnum-core/services/igm-util.service';


export const generatedPropSelectImports = [
  TranslateModule,
  JnumCoreModule,
  CommonModule,
  ReactiveFormsModule,
  ConsuladoModule,
  FiltrosComponent,
];


/**
 * PropSelect generado de la entidad Consulado
 * @implements {OnInit}
 */
@Component({
  standalone: true,
  imports: generatedPropSelectImports,
  selector: 'app-generated-consulado-prop-select',
  templateUrl: './generated-consulado-prop-select.component.html'
})
export class GeneratedConsuladoPropSelectComponent extends GenericPropSelectComponent<Consulado> implements OnInit {



    override columnDefinitions = [
    {
      idx:0, 
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
      idx:1, 
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
      idx:2, 
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
      idx:3, 
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
   

  protected consuladoService: ConsuladoService;


  constructor(
    protected override activeModal: NgbActiveModal,
    protected override fb: FormBuilder,
    protected override route: ActivatedRoute,
    protected igmUtilService: IgmUtilService,
  ) {
    super(activeModal, fb, route);
    this.consuladoService = this.injector.get(ConsuladoService); 
    this.listService = this.consuladoService;
    this.listFilter = new ConsuladoFilter();
    this.nombreFilter = 'consuladoPropFilter';  
    this.nombreEntidad = "consulado";
  }
  
  override ngOnInit() {
    super.ngOnInit();  
  }  

    
  setSearchForm():void{
    this.searchPropForm = this.fb.group( {
      nombrePaiseq: new FormControl( this.listFilter ? this.listFilter.nombrePaiseq : null,[] ),
      codigoeq: new FormControl( this.listFilter ? this.listFilter.codigoeq : null,[] ),
      nombreeq: new FormControl( this.listFilter ? this.listFilter.nombreeq : null,[] ),
      activoeq: new FormControl( this.listFilter ? this.listFilter.activoeq : null,[] ),
    });
  }
   
       
       


  override processSearchDataForFront(data: any) {
    this.dataSourceTotal = data.content;
    this.flatXlsData = this.flatXlsDataSource(this.dataSourceTotal ?? []);
    super.processSearchDataForFront(data);
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
}
