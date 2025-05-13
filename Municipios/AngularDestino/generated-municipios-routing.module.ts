import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuard } from "@jnum/jnum-core";
import { MunicipiosNewComponent } from '../../../customized/territorio/municipios/view/municipios-new.component';
import { MunicipiosEditComponent } from '../../../customized/territorio/municipios/view/municipios-edit.component';
import { MunicipiosListWrapperComponent } from "../../../customized/territorio/municipios/view/municipios-list-wrapper.component";
import { MunicipiosComponent } from "../../../customized/territorio/municipios/view/municipios.component";

/**
 * Rutas generadas de la entidad municipios
 */ 
export const municipiosGeneratedRoutes: Routes = [
  {
    path: '', 
    component: MunicipiosListWrapperComponent, 
    data: { breadcrumb: "municipios.nombreentidad", root: "true" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'municipioslist', 
    component: MunicipiosListWrapperComponent, 
    data: { breadcrumb: "global.add municipios.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  {
    path: 'municipioslist/:from', 
    component: MunicipiosListWrapperComponent, 
    data: { breadcrumb: "global.add municipios.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  { 
    path: 'municipiosnew', 
    component: MunicipiosNewComponent, 
    data: { breadcrumb: "global.add municipios.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  {
    path: 'municipiosedit', 
    component: MunicipiosEditComponent, 
    data: { breadcrumb: "global.editar municipios.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  {
    path: 'municipiosedit/:idEntidad/:idMunicipio', 
    component: MunicipiosEditComponent, 
    data: { breadcrumb: "global.editar municipios.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  { 
    path: 'modalmunicipioslist', 
    component: MunicipiosListWrapperComponent, data: { breadcrumb: "global.add municipios.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'modalmunicipioslist/:from', 
    component: MunicipiosListWrapperComponent, 
    data: { breadcrumb: "global.add municipios.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'modalmunicipiosnew', 
    component: MunicipiosNewComponent, 
    data: { breadcrumb: "global.add municipios.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'modalmunicipiosedit', 
    component: MunicipiosEditComponent, 
    data: { breadcrumb: "global.editar municipios.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'modalmunicipiosedit/:idEntidad/:idMunicipio', 
    component: MunicipiosEditComponent, 
    data: { breadcrumb: "global.editar municipios.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
];
export class GeneratedMunicipiosRoutingModule { }