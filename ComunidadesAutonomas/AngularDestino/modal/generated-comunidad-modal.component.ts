import { Component, OnInit, OnDestroy } from "@angular/core";
import { ModalComponent } from "@jnum/jnum-core";
import { Router, ActivatedRoute, RouterModule } from "@angular/router";
import { NavigationService } from "@jnum/jnum-core";
import { UtilService } from "@jnum/jnum-core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { ComunidadService } from "../../../../customized/territorio/comunidad/service/comunidad.service";
/**
 * Modal generado de la entidad Comunidad
 * @implements {OnInit, OnDestroy}
 */
@Component({
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterModule],
  selector: 'app-generated-comunidad-modal',
  templateUrl: './generated-comunidad-modal.component.html'
})
export class GeneratedComunidadModalComponent extends ModalComponent implements OnInit, OnDestroy {

    /**
     * @constructor
     * @param  {NgbActiveModal} activeModal
     * @param  {Router} router
     * @param  {ActivatedRoute} route
     * @param  {UtilService} utilService
     * @param  {NavigationService} navigationService
     * @param  {ComunidadService} comunidadService
     */
    constructor(
        protected override activeModal: NgbActiveModal,
        protected override router: Router,
        protected override route: ActivatedRoute,
        protected override utilService: UtilService,
        protected override navigationService: NavigationService,
        protected comunidadService:ComunidadService
    ) {
        super(activeModal, router, route, utilService, navigationService);
    }

    ngOnInit() {
        if (this.data && this.data.url) {
            //super.ngOnInit();
            this.router.navigate([{ outlets: { comunidad: this.data.url } }])
        }
    }

    ngOnDestroy() {
        //super.ngOnDestroy();
        this.comunidadService.modaldata = null;
        this.navigationService.getPreviousUrl();
        this.router.navigate(['', { outlets: { comunidad: null } }])
    }
}