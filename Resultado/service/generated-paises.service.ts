import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { tap } from "rxjs/internal/operators/tap";
import { map } from 'rxjs/internal/operators/map';
import { Subject } from 'rxjs/internal/Subject';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { environment } from '../../environments/environment';
import { BaseService, SortType, AlertType, PaginationPage, GenericopBean, PageEvent } from "@jnum/jnum-core";
import { PaisesBase } from '../model/paises-base';
import { GeneratedPaisesFilter } from '../filter/generated-paises-filter';
import { IgmUtilService } from '../jnum-core/services/igm-util.service';

/**
 * Servicio generado Paises
 * @implements {OnInit}
 */
@Injectable({
    providedIn: 'root',
})
export abstract class GeneratedPaisesService extends BaseService<PaisesBase> implements OnInit {
 
  private _paisesCached!: Observable<PaginationPage<PaisesBase>> | null;      
  private _reloadPaisesSubject: Subject<boolean>= new Subject();  

  searchUrl:string= `${environment.serviceUrl}/api/paises/Buscar`;
  deleteUrl:string = `${environment.serviceUrl}/api/paises/Eliminar`;
  addUrl:string = `${environment.serviceUrl}/api/paises/Insertar`;
  editUrl:string = `${environment.serviceUrl}/api/paises/Cargar`;
  updateUrl:string = `${environment.serviceUrl}/api/paises/Actualizar`;
     
    
  /**
   * @constructor
   */
  constructor(protected igmUtilService: IgmUtilService) {
    super();
    this.memcollection = "mpaiss";
    this.url = environment.serviceUrl+'/paises';
  }
  
  /**
   * @returns void
   */
  ngOnInit(): void {}    
    
    
  /**
     * Get reload Paises Subject
     * 
   * @returns Observable
   */
  public getReloadPaisesSubject(): Observable<boolean> {
    return this._reloadPaisesSubject.asObservable();
  }

  /**
     * Set reload Paises Subject
     * 
   * @param  {boolean} reload
   */
  public setReloadPaisesSubject(reload:boolean) {
    this._reloadPaisesSubject.next(reload);
  }
    
  /**
   * Clear the cache
   */    
  override clearCache(){
    this.paisesCached=null;
  }

  /**
   * Get all entities.
   * @returns Observable
   */    
  override getAllEntities(data?:any): Observable<any>{
    const paisesFilter = new GeneratedPaisesFilter();
    return this.searchEntitiesByFilter(paisesFilter, Number.MAX_VALUE);
  }   


  /**
   * Get entities not paginated.
   * @returns Observable
   */    
  override searchEntitiesByFilterNoPaginated(paisesFilter: GeneratedPaisesFilter,
    sort?: SortType):  Observable<PaginationPage<PaisesBase>>{
    return this.searchEntitiesByFilter(paisesFilter, Number.MAX_VALUE, null, sort);
  }     

  override guid(paises: PaisesBase) {
    let embeddedid = {    
          idEntidad: Math.floor((1 + Math.random()) * 0x10000)
    }
    paises.id = embeddedid;
  }


  /**
   * Getter paisesCached
   * @return {Observable<PaginationPage<PaisesBase>>}
   */
  public get paisesCached(): Observable<PaginationPage<PaisesBase>> | null {
      return this._paisesCached;
  }

  /**
   * Setter paisesCached
   * @param {Observable<PaginationPage<PaisesBase>>} value
   */
  public set paisesCached(value: Observable<PaginationPage<PaisesBase>> | null) {
      this._paisesCached = value;
  }


  /**
   * Comprueba si un usuario puede añadir una nueva entidad.
   *
   * @returns Observable
   */
  override canDoAdd(): Observable<any> {
    return of(true);
  }

  /**
   * Comprueba si un usuario puede editar una entidad.
   *
   * @returns Observable
   */
  override canDoEdit(): Observable<any> {
    return of(true);
  }

  /**
   * Comprueba si un usuario puede eliminar una entidad.
   *
   * @returns Observable
   */
  override canDoDelete(): Observable<any> {
    return of(true);
  }    


  override deleteEntity(
    id: string,
    showMessage: boolean = true,
    spinnerActivate: boolean = true,
  ): Observable<PaisesBase> {
    const keys = ["idEntidad"];
    const result = this.igmUtilService.splitId(keys, id);
    this.clearCache();
    if (spinnerActivate) {
      this.startSpinner();
    }
    if (!this.memory) {
      const filterAux = this.mapFilterForDelete(result);
      return this.http
        .delete<PaisesBase>(this.deleteUrl, {
          headers: this.getHttpHeaders(),
          body: filterAux,
        })
        .pipe(
          tap((_) => {
            if (spinnerActivate) {
              this.stopSpinner();
            }
            if (showMessage && this.showMessage) {
              this.utilService.showAlertSuccess("toaster.deleteok");
            }
          })
        );
    } else {
      return this.deleteEntityFromMemory(
        id,
        spinnerActivate ?? false,
        showMessage ?? false
      );
    }
  }  

  /**
   * Busqueda de entidades por filtro.
   *
   * @param  {GeneratedPaisesFilter} filter
   * @param  {number} pageSize
   * @param  {PageEvent} event?
   * @param  {SortType} sort?
   * @param  {boolean} disable
   * @returns {Observable<PaginationPage<PaisesBase>>}
   */
  override searchEntitiesByFilter(
    filter: GeneratedPaisesFilter,
    pageSize: number,
    event?: PageEvent | null,
    sort?: SortType,
    disable: boolean = false
  ): Observable<PaginationPage<PaisesBase>> {    
    const filterAux = this.mapFilterForSearch(filter);
    if (!disable) {
      this.startSpinner();
    }
    return this.http
      .post<Array<PaisesBase>>(
        this.igmUtilService.buildUrl(
          this.searchUrl,
          event,
          sort
        ),
        filterAux,
        { headers: this.getHttpHeaders() }
      )
      .pipe(
        map((response: PaisesBase[]) => {
          //Modifico la respuesta para adecuarla al funcionamiento de JNUM, el front espera un id, comboLabel, type, module y version
          const modifiedResponse = response.map((item) => ({
            ...item,
            ...this.mapEntityIdForSearch(item),        
            ...this.mapSearchResponseToEntity(item),
            ...this.getCommonAtributes(item),
          }));          
          return {
            content: modifiedResponse,
            totalElements: response.length,
          } as PaginationPage<PaisesBase>;
        }),
        tap((_) => {
          if (!disable) {
            this.stopSpinner();
          }
        })
      );
  }  

  /**
   * Añade una nueva entidad.
   *
   * @param  {PaisesBase} entity
   * @param {boolean} [showMessage=true]
   * @param {boolean} [spinnerActivate=true]
   * @returns {Observable<PaisesBase>}
   */
  override addEntity(
    entity: PaisesBase,
    showMessage: boolean = true,
    spinnerActivate: boolean = true
  ): Observable<PaisesBase> {
    this.clearCache();
    if (spinnerActivate) {
      this.startSpinner();
    }
    if (!this.memory) {
      const entityAux = this.mapEntityForAdd(entity);
      return this.http
        .post<PaisesBase>(this.addUrl, entityAux, {
          headers: this.getHttpHeaders(),
        })
        .pipe(
          map((response) => {
            return {
              ...response,
              ...this.mapAddResponseToEntity(response),
              ...this.mapEntityId(response),
              ...this.getCommonAtributes(response),
            };
          }),
          tap((_) => {
            if (spinnerActivate) {
              this.stopSpinner();
            }
            if (showMessage && this.showMessage) {
              this.utilService.showAlertSuccess("toaster.addok");
            }
          })
        );
    } else {
      return this.addEntityToMemory(entity);
    }
  }
  
  /**
   * Retorna los datos de una entidad.
   *
   * @param  {string} id
   * @returns {Observable<PaisesBase>}
   */
  override getEntity(id: string): Observable<PaisesBase> {
    const keys = ["idEntidad"];
    const result = this.igmUtilService.splitId(keys, id);
    if (!this.memory) {
      const filterAux = this.mapFilterForGet(result);
      return this.http
        .post<PaisesBase>(this.editUrl, filterAux, {
          headers: this.getHttpHeaders(),
        })
        .pipe(
          map((response) => {
            return {
              ...response,
              ...this.mapResponseToEntity(response),
              ...this.mapEntityIdForGet(response),
              ...this.getCommonAtributes(response),
            };
          })
        );
    } else {
      return this.getEntityFromMemory(id);
    }
  }
  
  /**
   * Actualiza una entidad.
   *
   * @param  {PaisesBase} entity
   * @param  {any} id
   * @param {boolean} [showMessage=true]
   * @param {boolean} [spinnerActivate=true]
   * @returns {Observable<object>}
   */
  override updateEntity(
    entity: PaisesBase,
    id: any,
    showMessage: boolean = true,
    spinnerActivate: boolean = true
  ): Observable<object> {
    const keys = ["idEntidad"];
    const result = this.igmUtilService.splitId(keys, id);
    this.clearCache();
    if (spinnerActivate) {
      this.startSpinner();
    }
    if (!this.memory) {
      const entityAux = {...result, ...this.mapEntityForUpdate(entity)};
      return this.http
        .put<object>(this.updateUrl, entityAux, {
          headers: this.getHttpHeaders(),
        })
        .pipe(
          map((response) => {
            return {
              ...response,
              ...this.mapUpdateResponseToEntity(response as PaisesBase),
              ...this.mapEntityIdForUpdate(response),
              ...this.getCommonAtributes(response as PaisesBase),
            };
          }),
          tap((_) => {
            if (spinnerActivate) {
              this.stopSpinner();
            }
            if (showMessage && this.showMessage) {
              this.utilService.showAlertSuccess("toaster.updateok");
            }
          })
        );
    } else {
      return this.updateEntityToMemory(entity, id);
    }
  }

  getCommonAtributes(item: PaisesBase): any {
    return {
      type: "Paises",
      module: "paises",
      version: 1
    };
  }
  
  mapEntityId(item: any): any {
    return { id: `${item.idEntidad}` };
  }

  mapEntityIdForSearch(item: any){
    return this.mapEntityId(item);
  }
  
  mapEntityIdForUpdate(item: any){
    return this.mapEntityId(item);
  }
  
  mapEntityIdForGet(item: any){
    return this.mapEntityId(item);
  }
  
  mapEntityIdForAdd(item: any){
    return this.mapEntityId(item);
  }
  
  mapFilterForSearch(filter: GeneratedPaisesFilter): any{
    return filter;
  }
  
  mapFilterForDelete(result: any) {
    return {
      idEntidad: result.idEntidad
    };
  }
  
  mapFilterForGet(result: any) {
    return {
      idEntidad: result.idEntidad
    };
  }
  
  mapFilterForUpdate(result: any) {
    return {
      idEntidad: result.idEntidad
    };
  }
  
  mapSearchResponseToEntity(response: PaisesBase): any{
    return response;
  }
  
  mapEntityForAdd(entity: PaisesBase): any{
    return entity;
  }
  
  mapAddResponseToEntity(response: PaisesBase): any{
    return response;
  }
  
  mapEntityForUpdate(entity: PaisesBase): any{
    return entity;
  }
  
  mapUpdateResponseToEntity(response: PaisesBase): any{
    return response;
  }
  
  mapResponseToEntity(response: PaisesBase): any{
    return response;
  }
} 