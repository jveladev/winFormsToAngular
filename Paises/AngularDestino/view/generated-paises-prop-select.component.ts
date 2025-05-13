import { Component, OnInit, Output, EventEmitter, Inject,ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericPropSelectComponent, JnumCoreModule, JnumValidator } from "@jnum/jnum-core";
import { PaisesFilter } from '../../../../customized/territorio/paises/filter/paises-filter';
import { PaisesService } from '../../../../customized/territorio/paises/service/paises.service';
import { Paises } from '../../../../customized/territorio/paises/model/paises';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

import { PaisesModule } from '../../../../customized/territorio/paises/paises.module';
import { FiltrosComponent } from "../../../../jnum-core/filtros/filtros.component";
import { IgmUtilService } from '../../../../jnum-core/services/igm-util.service';


export const generatedPropSelectImports = [
  TranslateModule,
  JnumCoreModule,
  CommonModule,
  ReactiveFormsModule,
  PaisesModule,
  FiltrosComponent,
];


/**
 * PropSelect generado de la entidad Paises
 * @implements {OnInit}
 */
@Component({
  standalone: true,
  imports: generatedPropSelectImports,
  selector: 'app-generated-paises-prop-select',
  templateUrl: './generated-paises-prop-select.component.html'
})
export class GeneratedPaisesPropSelectComponent extends GenericPropSelectComponent<Paises> implements OnInit {



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
   

  protected paisesService: PaisesService;


  constructor(
    protected override activeModal: NgbActiveModal,
    protected override fb: FormBuilder,
    protected override route: ActivatedRoute,
    protected igmUtilService: IgmUtilService,
  ) {
    super(activeModal, fb, route);
    this.paisesService = this.injector.get(PaisesService); 
    this.listService = this.paisesService;
    this.listFilter = new PaisesFilter();
    this.nombreFilter = 'paisesPropFilter';  
    this.nombreEntidad = "paises";
  }
  
  override ngOnInit() {
    super.ngOnInit();  
  }  

    
  setSearchForm():void{
    this.searchPropForm = this.fb.group( {
      codigoeq: new FormControl( this.listFilter ? this.listFilter.codigoeq : null,[] ),
      digitoeq: new FormControl( this.listFilter ? this.listFilter.digitoeq : null,[] ),
      nombreeq: new FormControl( this.listFilter ? this.listFilter.nombreeq : null,[] ),
      comunitarioeq: new FormControl( this.listFilter ? this.listFilter.comunitarioeq : null,[] ),
      activoeq: new FormControl( this.listFilter ? this.listFilter.activoeq : null,[] ),
      asimiladoAComunitarioeq: new FormControl( this.listFilter ? this.listFilter.asimiladoAComunitarioeq : null,[] ),
    });
  }
   
       
       


  override processSearchDataForFront(data: any) {
    this.dataSourceTotal = data.content;
    this.flatXlsData = this.flatXlsDataSource(this.dataSourceTotal ?? []);
    super.processSearchDataForFront(data);
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
}
