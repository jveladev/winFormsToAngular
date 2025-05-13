import { Component, OnInit, OnDestroy } from "@angular/core";
import { ModalComponent } from "@jnum/jnum-core";
import { Router, ActivatedRoute, RouterModule } from "@angular/router";
import { NavigationService } from "@jnum/jnum-core";
import { UtilService } from "@jnum/jnum-core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { ProvinciaService } from "../../../../customized/territorio/provincia/service/provincia.service";
/**
 * Modal generado de la entidad Provincia
 * @implements {OnInit, OnDestroy}
 */
@Component({
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterModule],
  selector: 'app-generated-provincia-modal',
  templateUrl: './generated-provincia-modal.component.html'
})
export class GeneratedProvinciaModalComponent extends ModalComponent implements OnInit, OnDestroy {

    /**
     * @constructor
     * @param  {NgbActiveModal} activeModal
     * @param  {Router} router
     * @param  {ActivatedRoute} route
     * @param  {UtilService} utilService
     * @param  {NavigationService} navigationService
     * @param  {ProvinciaService} provinciaService
     */
    constructor(
        protected override activeModal: NgbActiveModal,
        protected override router: Router,
        protected override route: ActivatedRoute,
        protected override utilService: UtilService,
        protected override navigationService: NavigationService,
        protected provinciaService:ProvinciaService
    ) {
        super(activeModal, router, route, utilService, navigationService);
    }

    ngOnInit() {
        if (this.data && this.data.url) {
            //super.ngOnInit();
            this.router.navigate([{ outlets: { provincia: this.data.url } }])
        }
    }

    ngOnDestroy() {
        //super.ngOnDestroy();
        this.provinciaService.modaldata = null;
        this.navigationService.getPreviousUrl();
        this.router.navigate(['', { outlets: { provincia: null } }])
    }
}