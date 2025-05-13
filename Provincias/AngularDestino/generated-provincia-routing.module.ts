import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuard } from "@jnum/jnum-core";
import { ProvinciaNewComponent } from '../../../customized/territorio/provincia/view/provincia-new.component';
import { ProvinciaEditComponent } from '../../../customized/territorio/provincia/view/provincia-edit.component';
import { ProvinciaListWrapperComponent } from "../../../customized/territorio/provincia/view/provincia-list-wrapper.component";
import { ProvinciaComponent } from "../../../customized/territorio/provincia/view/provincia.component";

/**
 * Rutas generadas de la entidad provincia
 */ 
export const provinciaGeneratedRoutes: Routes = [
  {
    path: '', 
    component: ProvinciaListWrapperComponent, 
    data: { breadcrumb: "provincia.nombreentidad", root: "true" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'provincialist', 
    component: ProvinciaListWrapperComponent, 
    data: { breadcrumb: "global.add provincia.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  {
    path: 'provincialist/:from', 
    component: ProvinciaListWrapperComponent, 
    data: { breadcrumb: "global.add provincia.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  { 
    path: 'provincianew', 
    component: ProvinciaNewComponent, 
    data: { breadcrumb: "global.add provincia.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  {
    path: 'provinciaedit', 
    component: ProvinciaEditComponent, 
    data: { breadcrumb: "global.editar provincia.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  {
    path: 'provinciaedit/:idEntidad/:idProvincia', 
    component: ProvinciaEditComponent, 
    data: { breadcrumb: "global.editar provincia.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  { 
    path: 'modalprovincialist', 
    component: ProvinciaListWrapperComponent, data: { breadcrumb: "global.add provincia.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'modalprovincialist/:from', 
    component: ProvinciaListWrapperComponent, 
    data: { breadcrumb: "global.add provincia.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'modalprovincianew', 
    component: ProvinciaNewComponent, 
    data: { breadcrumb: "global.add provincia.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'modalprovinciaedit', 
    component: ProvinciaEditComponent, 
    data: { breadcrumb: "global.editar provincia.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'modalprovinciaedit/:idEntidad/:idProvincia', 
    component: ProvinciaEditComponent, 
    data: { breadcrumb: "global.editar provincia.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
];
export class GeneratedProvinciaRoutingModule { }