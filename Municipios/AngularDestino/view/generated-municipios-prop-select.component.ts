import { Component, OnInit, Output, EventEmitter, Inject,ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericPropSelectComponent, JnumCoreModule, JnumValidator } from "@jnum/jnum-core";
import { MunicipiosFilter } from '../../../../customized/territorio/municipios/filter/municipios-filter';
import { MunicipiosService } from '../../../../customized/territorio/municipios/service/municipios.service';
import { Municipios } from '../../../../customized/territorio/municipios/model/municipios';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

import { MunicipiosModule } from '../../../../customized/territorio/municipios/municipios.module';
import { FiltrosComponent } from "../../../../jnum-core/filtros/filtros.component";
import { IgmUtilService } from '../../../../jnum-core/services/igm-util.service';


export const generatedPropSelectImports = [
  TranslateModule,
  JnumCoreModule,
  CommonModule,
  ReactiveFormsModule,
  MunicipiosModule,
  FiltrosComponent,
];


/**
 * PropSelect generado de la entidad Municipios
 * @implements {OnInit}
 */
@Component({
  standalone: true,
  imports: generatedPropSelectImports,
  selector: 'app-generated-municipios-prop-select',
  templateUrl: './generated-municipios-prop-select.component.html'
})
export class GeneratedMunicipiosPropSelectComponent extends GenericPropSelectComponent<Municipios> implements OnInit {



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
   

  protected municipiosService: MunicipiosService;


  constructor(
    protected override activeModal: NgbActiveModal,
    protected override fb: FormBuilder,
    protected override route: ActivatedRoute,
    protected igmUtilService: IgmUtilService,
  ) {
    super(activeModal, fb, route);
    this.municipiosService = this.injector.get(MunicipiosService); 
    this.listService = this.municipiosService;
    this.listFilter = new MunicipiosFilter();
    this.nombreFilter = 'municipiosPropFilter';  
    this.nombreEntidad = "municipios";
  }
  
  override ngOnInit() {
    super.ngOnInit();  
  }  

    
  setSearchForm():void{
    this.searchPropForm = this.fb.group( {
      codigoeq: new FormControl( this.listFilter ? this.listFilter.codigoeq : null,[] ),
      codigoINEeq: new FormControl( this.listFilter ? this.listFilter.codigoINEeq : null,[] ),
      nombreeq: new FormControl( this.listFilter ? this.listFilter.nombreeq : null,[] ),
      provinciaeq: new FormControl( this.listFilter ? this.listFilter.provinciaeq : null,[] ),
      digitoeq: new FormControl( this.listFilter ? this.listFilter.digitoeq : null,[] ),
      nombre50eq: new FormControl( this.listFilter ? this.listFilter.nombre50eq : null,[] ),
      nombreCortoeq: new FormControl( this.listFilter ? this.listFilter.nombreCortoeq : null,[] ),
      activoeq: new FormControl( this.listFilter ? this.listFilter.activoeq : null,[] ),
      codigoAEATeq: new FormControl( this.listFilter ? this.listFilter.codigoAEATeq : null,[] ),
    });
  }
   
       
       


  override processSearchDataForFront(data: any) {
    this.dataSourceTotal = data.content;
    this.flatXlsData = this.flatXlsDataSource(this.dataSourceTotal ?? []);
    super.processSearchDataForFront(data);
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
}
