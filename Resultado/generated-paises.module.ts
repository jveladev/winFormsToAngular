import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JnumCoreModule } from "@jnum/jnum-core";
import { PaisesRoutingModule } from './paises/paises-routing.module';
import { PaisesComponent } from './view/generated-paises.component';
import { PaisesListWrapperComponent } from "./view/generated-paises-list-wrapper.component";
import { PaisesSearchComponent } from './view/generated-paises-search.component';
import { PaisesListComponent } from './view/generated-paises-list.component';
import { PaisesNewComponent } from './view/generated-paises-new.component';
import { PaisesEditComponent } from './view/generated-paises-edit.component';
import { PaisesBotoneraComponent } from './view/generated-paises-botonera.component';
import { PaisesBotoneraOpComponent } from './view/generated-paises-botonera-op.component';

import { FiltrosComponent } from "../jnum-core/filtros/filtros.component";
import { ScrollingModule } from "@angular/cdk/scrolling";
/**
 * Módulo generado de la entidad paises
 */ 
export const generatedImports= [
        CommonModule,
        FormsModule,
        RouterModule,
        ScrollingModule,
        ReactiveFormsModule,
        JnumCoreModule,
        FiltrosComponent,
        PaisesRoutingModule
    ];
    
export const generatedDeclarations=[
        PaisesComponent,
        PaisesListWrapperComponent,
        PaisesSearchComponent,
        PaisesListComponent,
        PaisesNewComponent,
        PaisesEditComponent,
        PaisesBotoneraComponent,
        PaisesBotoneraOpComponent
    ];
    
   
export const generatedProviders=[] 
    
export const generatedExports=[
        PaisesComponent,
        PaisesListWrapperComponent,
        PaisesSearchComponent,
        PaisesListComponent,
        PaisesNewComponent,
        PaisesEditComponent,
        PaisesBotoneraComponent,
        PaisesBotoneraOpComponent           
    ]; 
export class GeneratedPaisesModule { } 