import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Paises } from '../../../../customized/territorio/paises/model/paises';

/**
 * Botonera operador generada de la entidad Paises
 * @implements {OnInit}
 */
@Component({
  selector: 'app-generated-paises-botonera-op',
  templateUrl: './generated-paises-botonera-op.component.html'
})
export class GeneratedPaisesBotoneraOpComponent implements OnInit {

  @Input() entity: Paises = new Paises();
  @Input() pop: boolean = false;

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() { }

  /**
   * Navega al listado.
   */
  navigateToListado() {
    if (this.pop) {
      this.activeModal.close(null);
    } else {
      this.router.navigate(['/territorio/paises/listado']);
    }
  }

  /**
   * Navega a edit.
   */
  navigateToEditar() {
    if (this.pop) {
      this.activeModal.close(this.entity);
    } else {
      this.router.navigate([`/territorio/paises/editar/${this.entity.id}`]);
    }
  }
}