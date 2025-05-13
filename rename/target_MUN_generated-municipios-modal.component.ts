import { Component, OnInit, OnDestroy } from "@angular/core";
import { ModalComponent } from "@jnum/jnum-core";
import { Router, ActivatedRoute, RouterModule } from "@angular/router";
import { NavigationService } from "@jnum/jnum-core";
import { UtilService } from "@jnum/jnum-core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { MunicipiosService } from "../../../../customized/territorio/municipios/service/municipios.service";
/**
 * Modal generado de la entidad Municipios
 * @implements {OnInit, OnDestroy}
 */
@Component({
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterModule],
  selector: 'app-generated-municipios-modal',
  templateUrl: './generated-municipios-modal.component.html'
})
export class GeneratedMunicipiosModalComponent extends ModalComponent implements OnInit, OnDestroy {

    /**
     * @constructor
     * @param  {NgbActiveModal} activeModal
     * @param  {Router} router
     * @param  {ActivatedRoute} route
     * @param  {UtilService} utilService
     * @param  {NavigationService} navigationService
     * @param  {MunicipiosService} municipiosService
     */
    constructor(
        protected override activeModal: NgbActiveModal,
        protected override router: Router,
        protected override route: ActivatedRoute,
        protected override utilService: UtilService,
        protected override navigationService: NavigationService,
        protected municipiosService:MunicipiosService
    ) {
        super(activeModal, router, route, utilService, navigationService);
    }

    ngOnInit() {
        if (this.data && this.data.url) {
            //super.ngOnInit();
            this.router.navigate([{ outlets: { municipios: this.data.url } }])
        }
    }

    ngOnDestroy() {
        //super.ngOnDestroy();
        this.municipiosService.modaldata = null;
        this.navigationService.getPreviousUrl();
        this.router.navigate(['', { outlets: { municipios: null } }])
    }
}