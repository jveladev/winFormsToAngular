import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaisesService } from '../../../../customized/territorio/paises/service/paises.service';
import { Paises } from '../../../../customized/territorio/paises/model/paises';

/**
 * Botonera generada de la entidad Paises
 * @implements {OnInit}
 */
@Component({
  selector: 'app-generated-paises-botonera',
  templateUrl: './generated-paises-botonera.component.html'
})
export class GeneratedPaisesBotoneraComponent implements OnInit {

  paises: Paises = new Paises();

  constructor(
    private paisesService: PaisesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        const id = params['id'];
        this.paisesService.getEntity(id).subscribe(data => {
          this.paises = data;
        });
      }
    });
  }

  /**
   * Navega al listado.
   */
  navigateToListado() {
    this.router.navigate(['/territorio/paises/listado']);
  }

  /**
   * Navega a edit.
   */
  navigateToEditar() {
    this.router.navigate([`/territorio/paises/editar/${this.paises.id}`]);
  }
}