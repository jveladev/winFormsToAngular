import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Paises } from '../../../../customized/territorio/paises/model/paises';
import { PaisesService } from '../../../../customized/territorio/paises/service/paises.service';

/**
 * Modal generado de la entidad Paises
 * @implements {OnInit}
 */
@Component({
  selector: 'app-generated-paises-modal',
  templateUrl: './generated-paises-modal.component.html'
})
export class GeneratedPaisesModalComponent implements OnInit {

  @Input() data: any;
  title: string = "";
  paises: Paises = new Paises();

  constructor(
    public activeModal: NgbActiveModal,
    private paisesService: PaisesService
  ) { }

  ngOnInit() {
    this.data = this.data || {};
    this.title = this.data.title || '';
    
    if (this.data.entity) {
      this.paises = this.data.entity;
    } else if (this.data.id) {
      this.paisesService.getEntity(this.data.id).subscribe(data => {
        this.paises = data;
      });
    }
  }

  /**
   * Cierra el modal.
   */
  cerrar() {
    this.activeModal.close(null);
  }

  /**
   * Cierra el modal con la entidad.
   */
  seleccionar() {
    this.activeModal.close(this.paises);
  }
}