import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuard } from "@jnum/jnum-core";
import { ConsuladoNewComponent } from '../../../customized/territorio/consulado/view/consulado-new.component';
import { ConsuladoEditComponent } from '../../../customized/territorio/consulado/view/consulado-edit.component';
import { ConsuladoListWrapperComponent } from "../../../customized/territorio/consulado/view/consulado-list-wrapper.component";
import { ConsuladoComponent } from "../../../customized/territorio/consulado/view/consulado.component";

/**
 * Rutas generadas de la entidad consulado
 */ 
export const consuladoGeneratedRoutes: Routes = [
  {
    path: '', 
    component: ConsuladoListWrapperComponent, 
    data: { breadcrumb: "consulado.nombreentidad", root: "true" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'consuladolist', 
    component: ConsuladoListWrapperComponent, 
    data: { breadcrumb: "global.add consulado.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  {
    path: 'consuladolist/:from', 
    component: ConsuladoListWrapperComponent, 
    data: { breadcrumb: "global.add consulado.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  { 
    path: 'consuladonew', 
    component: ConsuladoNewComponent, 
    data: { breadcrumb: "global.add consulado.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  {
    path: 'consuladoedit', 
    component: ConsuladoEditComponent, 
    data: { breadcrumb: "global.editar consulado.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  {
    path: 'consuladoedit/:idEntidad/:idConsulado', 
    component: ConsuladoEditComponent, 
    data: { breadcrumb: "global.editar consulado.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()] 
  },
  { 
    path: 'modalconsuladolist', 
    component: ConsuladoListWrapperComponent, data: { breadcrumb: "global.add consulado.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'modalconsuladolist/:from', 
    component: ConsuladoListWrapperComponent, 
    data: { breadcrumb: "global.add consulado.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'modalconsuladonew', 
    component: ConsuladoNewComponent, 
    data: { breadcrumb: "global.add consulado.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'modalconsuladoedit', 
    component: ConsuladoEditComponent, 
    data: { breadcrumb: "global.editar consulado.nombreentidad", reuse: true }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { 
    path: 'modalconsuladoedit/:idEntidad/:idConsulado', 
    component: ConsuladoEditComponent, 
    data: { breadcrumb: "global.editar consulado.nombreentidad" }, 
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
];
export class GeneratedConsuladoRoutingModule { }