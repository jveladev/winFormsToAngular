import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuard } from "@jnum/jnum-core";
import { ComunidadNewComponent } from '../../../customized/territorio/comunidad/view/comunidad-new.component';
import { ComunidadEditComponent } from '../../../customized/territorio/comunidad/view/comunidad-edit.component';
import { ComunidadListWrapperComponent } from "../../../customized/territorio/comunidad/view/comunidad-list-wrapper.component";
import { ComunidadComponent } from "../../../customized/territorio/comunidad/view/comunidad.component";

/**
 * Rutas generadas de la entidad comunidad
 */ 
export const comunidadGeneratedRoutes: Routes = [
  {
    path: '', 
    component: ComunidadListWrapperComponent, 
    data: { breadcrumb: "comunidad.nombreentidad", root: "true" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'comunidadlist', 
    component: ComunidadListWrapperComponent, 
    data: { breadcrumb: "global.add comunidad.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  {
    path: 'comunidadlist/:from', 
    component: ComunidadListWrapperComponent, 
    data: { breadcrumb: "global.add comunidad.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  { 
    path: 'comunidadnew', 
    component: ComunidadNewComponent, 
    data: { breadcrumb: "global.add comunidad.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  {
    path: 'comunidadedit', 
    component: ComunidadEditComponent, 
    data: { breadcrumb: "global.editar comunidad.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  {
    path: 'comunidadedit/:idEntidad/:idComunidad', 
    component: ComunidadEditComponent, 
    data: { breadcrumb: "global.editar comunidad.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  { 
    path: 'modalcomunidadlist', 
    component: ComunidadListWrapperComponent, data: { breadcrumb: "global.add comunidad.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'modalcomunidadlist/:from', 
    component: ComunidadListWrapperComponent, 
    data: { breadcrumb: "global.add comunidad.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'modalcomunidadnew', 
    component: ComunidadNewComponent, 
    data: { breadcrumb: "global.add comunidad.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'modalcomunidadedit', 
    component: ComunidadEditComponent, 
    data: { breadcrumb: "global.editar comunidad.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'modalcomunidadedit/:idEntidad/:idComunidad', 
    component: ComunidadEditComponent, 
    data: { breadcrumb: "global.editar comunidad.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
];
export class GeneratedComunidadRoutingModule { }