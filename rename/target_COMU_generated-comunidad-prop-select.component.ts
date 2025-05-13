import { Component, OnInit, Output, EventEmitter, Inject,ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericPropSelectComponent, JnumCoreModule, JnumValidator } from "@jnum/jnum-core";
import { ComunidadFilter } from '../../../../customized/territorio/comunidad/filter/comunidad-filter';
import { ComunidadService } from '../../../../customized/territorio/comunidad/service/comunidad.service';
import { Comunidad } from '../../../../customized/territorio/comunidad/model/comunidad';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

import { ComunidadModule } from '../../../../customized/territorio/comunidad/comunidad.module';
import { FiltrosComponent } from "../../../../jnum-core/filtros/filtros.component";
import { IgmUtilService } from '../../../../jnum-core/services/igm-util.service';


export const generatedPropSelectImports = [
  TranslateModule,
  JnumCoreModule,
  CommonModule,
  ReactiveFormsModule,
  ComunidadModule,
  FiltrosComponent,
];


/**
 * PropSelect generado de la entidad Comunidad
 * @implements {OnInit}
 */
@Component({
  standalone: true,
  imports: generatedPropSelectImports,
  selector: 'app-generated-comunidad-prop-select',
  templateUrl: './generated-comunidad-prop-select.component.html'
})
export class GeneratedComunidadPropSelectComponent extends GenericPropSelectComponent<Comunidad> implements OnInit {



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
   

  protected comunidadService: ComunidadService;


  constructor(
    protected override activeModal: NgbActiveModal,
    protected override fb: FormBuilder,
    protected override route: ActivatedRoute,
    protected igmUtilService: IgmUtilService,
  ) {
    super(activeModal, fb, route);
    this.comunidadService = this.injector.get(ComunidadService); 
    this.listService = this.comunidadService;
    this.listFilter = new ComunidadFilter();
    this.nombreFilter = 'comunidadPropFilter';  
    this.nombreEntidad = "comunidad";
  }
  
  override ngOnInit() {
    super.ngOnInit();  
  }  

    
  setSearchForm():void{
    this.searchPropForm = this.fb.group( {
      codigoeq: new FormControl( this.listFilter ? this.listFilter.codigoeq : null,[] ),
      nombreeq: new FormControl( this.listFilter ? this.listFilter.nombreeq : null,[] ),
      organoeq: new FormControl( this.listFilter ? this.listFilter.organoeq : null,[] ),
    });
  }
   
       
       


  override processSearchDataForFront(data: any) {
    this.dataSourceTotal = data.content;
    this.flatXlsData = this.flatXlsDataSource(this.dataSourceTotal ?? []);
    super.processSearchDataForFront(data);
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
}
