import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuard } from "@jnum/jnum-core";
import { PaisesNewComponent } from './view/generated-paises-new.component';
import { PaisesEditComponent } from './view/generated-paises-edit.component';
import { PaisesListWrapperComponent } from "./view/generated-paises-list-wrapper.component";
import { PaisesComponent } from "./view/generated-paises.component";

/**
 * Rutas generadas de la entidad paises
 */ 
export const paisesGeneratedRoutes: Routes = [
  {
    path: '', 
    component: PaisesListWrapperComponent, 
    data: { breadcrumb: "paises.nombreentidad", root: "true" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'paiseslist', 
    component: PaisesListWrapperComponent, 
    data: { breadcrumb: "global.add paises.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  {
    path: 'paiseslist/:from', 
    component: PaisesListWrapperComponent, 
    data: { breadcrumb: "global.add paises.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  { 
    path: 'paisesnew', 
    component: PaisesNewComponent, 
    data: { breadcrumb: "global.add paises.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  {
    path: 'paisesedit', 
    component: PaisesEditComponent, 
    data: { breadcrumb: "global.editar paises.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  {
    path: 'paisesedit/:idEntidad', 
    component: PaisesEditComponent, 
    data: { breadcrumb: "global.editar paises.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  { 
    path: 'modalpaiseslist', 
    component: PaisesListWrapperComponent, data: { breadcrumb: "global.add paises.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'modalpaiseslist/:from', 
    component: PaisesListWrapperComponent, 
    data: { breadcrumb: "global.add paises.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'modalpaisesnew', 
    component: PaisesNewComponent, 
    data: { breadcrumb: "global.add paises.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'modalpaisesedit', 
    component: PaisesEditComponent, 
    data: { breadcrumb: "global.editar paises.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'modalpaisesedit/:idEntidad', 
    component: PaisesEditComponent, 
    data: { breadcrumb: "global.editar paises.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
];
export class GeneratedPaisesRoutingModule { } 