import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisesComponent } from '../../../customized/territorio/paises/view/paises.component';
import { PaisesListWrapperComponent } from '../../../customized/territorio/paises/view/paises-list-wrapper.component';
import { PaisesNewComponent } from '../../../customized/territorio/paises/view/paises-new.component';
import { PaisesEditComponent } from '../../../customized/territorio/paises/view/paises-edit.component';

/**
 * Rutas generadas de la entidad Paises
 */
export const generatedPaisesRoutes: Routes = [
  {
    path: '',
    component: PaisesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'listado'
      },
      {
        path: 'listado',
        component: PaisesListWrapperComponent
      },
      {
        path: 'nuevo',
        component: PaisesNewComponent
      },
      {
        path: 'editar/:id',
        component: PaisesEditComponent
      }
    ]
  }
];

/**
 * Módulo de rutas generado de la entidad Paises
 */
@NgModule({
  imports: [RouterModule.forChild(generatedPaisesRoutes)],
  exports: [RouterModule]
})
export class GeneratedPaisesRoutingModule { }