import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuard } from "@jnum/jnum-core";
import { PaisesNewComponent } from '../../../customized/territorio/paises/view/paises-new.component';
import { PaisesEditComponent } from '../../../customized/territorio/paises/view/paises-edit.component';
import { PaisesListWrapperComponent } from "../../../customized/territorio/paises/view/paises-list-wrapper.component";
import { PaisesComponent } from "../../../customized/territorio/paises/view/paises.component";

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
    path: 'paisesedit/:idEntidad/:idPais', 
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
    path: 'modalpaisesedit/:idEntidad/:idPais', 
    component: PaisesEditComponent, 
    data: { breadcrumb: "global.editar paises.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
];
export class GeneratedPaisesRoutingModule { }