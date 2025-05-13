import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { tap } from "rxjs/internal/operators/tap";
import { map } from 'rxjs/internal/operators/map';
import { Subject } from 'rxjs/internal/Subject';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { environment } from '../../../../../environments/environment';
import { BaseService, SortType, AlertType, PaginationPage, GenericopBean, PageEvent } from "@jnum/jnum-core";
import { Comunidad } from '../../../../customized/territorio/comunidad/model/comunidad';
import { ComunidadFilter } from '../../../../customized/territorio/comunidad/filter/comunidad-filter';
import { IgmUtilService } from '../../../../jnum-core/services/igm-util.service';
/**
 * Servicio generado Comunidad
 * @implements {OnInit}
 */
@Injectable({
    providedIn: 'root',
})
export abstract class GeneratedComunidadService extends BaseService<Comunidad> implements OnInit{
 
  private _comunidadCached!: Observable<PaginationPage<Comunidad>> | null;      
  private _reloadComunidadSubject: Subject<boolean>= new Subject();  

  searchUrl:string= `${environment.serviceUrl}/api/territorio/Comunidad/Buscar`;
  deleteUrl:string = `${environment.serviceUrl}/api/territorio/Comunidad/Eliminar`;
  addUrl:string = `${environment.serviceUrl}/api/territorio/Comunidad/Insertar`;
  editUrl:string = `${environment.serviceUrl}/api/territorio/Comunidad/Cargar`;
  updateUrl:string = `${environment.serviceUrl}/api/territorio/Comunidad/Actualizar`;
     
    
  /**
   * @constructor
   */
  constructor(protected igmUtilService:IgmUtilService) {
    super();
    this.memcollection = "mcomunidads";
    this.url = environment.serviceUrl+'/territorio/comunidad';
  }
  
  /**
   * @returns void
   */
  ngOnInit(): void {}    
    
    
  /**
     * Get reload Comunidad Subject
     * 
   * @returns Observable
   */
  public getReloadComunidadSubject(): Observable<boolean> {
    return this._reloadComunidadSubject.asObservable();
  }

  /**
     * Set reload Comunidad Subject
     * 
   * @param  {boolean} reload
   */
  public setReloadComunidadSubject(reload:boolean) {
    this._reloadComunidadSubject.next(reload);
  }
    
  /**
   * Clear the cache
   */    
  override clearCache(){
    this.comunidadCached=null;
  }

  /**
   * Get all entities.
   * @returns Observable
   */    
  override getAllEntities(data?:any): Observable<any>{
    const comunidadFilter = new ComunidadFilter();
    return this.searchEntitiesByFilter(comunidadFilter, Number.MAX_VALUE);
  }   


  /**
   * Get entities not paginated.
   * @returns Observable
   */    
  override searchEntitiesByFilterNoPaginated(comunidadFilter: ComunidadFilter,
    sort?: SortType):  Observable<PaginationPage<Comunidad>>{
    return this.searchEntitiesByFilter(comunidadFilter,Number.MAX_VALUE,null,sort);
  }     
    
                

    obtenerComunidadByCodigo(codigo: string, event?: PageEvent): Observable<any> {
        return this.http.get<any>(this.url + "/getbycodigo/" + codigo , { headers: this.getHttpHeaders() });
    }                

  override guid(comunidad:Comunidad) {
    let embeddedid = {    
          idEntidad: Math.floor((1 + Math.random()) * 0x10000),
          idComunidad: Math.floor((1 + Math.random()) * 0x10000),
    }
    comunidad.id=embeddedid;
  }


    /**
     * Getter comunidadCached
     * @return {Observable<PaginationPage<Comunidad>>}
     */
    public get comunidadCached(): Observable<PaginationPage<Comunidad>> | null {
        return this._comunidadCached;
    }

    /**
     * Setter comunidadCached
     * @param {Observable<PaginationPage<Comunidad>>} value
     */
    public set comunidadCached(value: Observable<PaginationPage<Comunidad>> | null) {
        this._comunidadCached = value;
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
  ): Observable<Comunidad> {
    const keys = ["idEntidad","idComunidad"];
    const result = this.igmUtilService.splitId(keys, id);
    this.clearCache();
    if (spinnerActivate) {
      this.startSpinner();
    }
    if (!this.memory) {
      const filterAux = this.mapFilterForDelete(result);
      return this.http
        .delete<Comunidad>(this.deleteUrl, {
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
   * @param  {ComunidadFilter} filter
   * @param  {number} pageSize
   * @param  {PageEvent} event?
   * @param  {SortType} sort?
   * @param  {boolean} disable
   * @returns {Observable<PaginationPage<Comunidad>>}
   */
  override searchEntitiesByFilter(
    filter: ComunidadFilter,
    pageSize: number,
    event?: PageEvent | null,
    sort?: SortType,
    disable: boolean = false
  ): Observable<PaginationPage<Comunidad>> {    
    const filterAux = this.mapFilterForSearch(filter);
    if (!disable) {
      this.startSpinner();
    }
    return this.http
      .post<Array<Comunidad>>(
        this.igmUtilService.buildUrl(
          this.searchUrl,
          event,
          sort
        ),
        filterAux,
        { headers: this.getHttpHeaders() }
      )
      .pipe(
        map((response: Comunidad[]) => {
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
          } as PaginationPage<Comunidad>;
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
   * @param  {Comunidad} entity
   * @param {boolean} [showMessage=true]
   * @param {boolean} [spinnerActivate=true]
   * @returns {Observable<Comunidad>}
   */
  override addEntity(
    entity: Comunidad,
    showMessage: boolean = true,
    spinnerActivate: boolean = true
  ): Observable<Comunidad> {
    this.clearCache();
    if (spinnerActivate) {
      this.startSpinner();
    }
    if (!this.memory) {
      return this.http
        .post<Comunidad>(
          this.addUrl,
          this.mapEntityForAdd(entity),
          { headers: this.getHttpHeaders() }
        )
        .pipe(
          map((entitynew) => {
            entitynew = {
              ...entitynew,
              ...this.mapResponseToEntity(entitynew), 
              ...this.mapEntityIdForAdd(entitynew),                   
              ...this.getCommonAtributes(entitynew),
            } as Comunidad;             
            return entitynew;
          }),
          tap((entitynew: Comunidad) => {
            this.processAddEntityWithoutError(
              entitynew,
              spinnerActivate,
              showMessage
            );
          })
        );
    } else {
      return this.addEntityToMemory(entity, spinnerActivate);
    }
  }  

  /**
   * Devuelve una entidad. Si el memory es true la devuelve de la memoria, sino del backend.
   * @param {string} id
   * @returns {Observable<Comunidad>}
   */
  override getEntity(id: string): Observable<Comunidad> {
    const keys = ["idEntidad","idComunidad"];
    const result = this.igmUtilService.splitId(keys, id);
    if (!this.memory) {
      const filterAux = this.mapFilterForGet(result);
      return this.http
        .post<Comunidad>(
          this.editUrl,
          filterAux,
          { headers: this.getHttpHeaders() }
        )
        .pipe(
          map((entityloaded: Comunidad) => {
            entityloaded = {
              ...entityloaded,
              ...this.mapEntityIdForGet(entityloaded),            
              ...this.mapResponseToEntity(entityloaded),             
              ...this.getCommonAtributes(entityloaded),
            } as Comunidad;  
            return entityloaded;
          })
        );
    } else {
      return this.http.get<Comunidad>(
        `${this.MSERVER_URL + this.memcollection}/${this.replaceAll(
          id,
          "/",
          "-"
        )}`
      );
    }
  }  

  override updateEntity(
    entity: Comunidad,
    id: any,
    showMessage: boolean = true,
    spinnerActivate: boolean = true
  ): Observable<object> {
    id = this.utilService.getEntityId(id);
    const keys = ["idEntidad","idComunidad"];
    const result = this.igmUtilService.splitId(keys, id);
    this.clearCache();
    if (spinnerActivate) {
      this.startSpinner();
    }
    if (!this.memory) {      
      const entityUpdated = {
        ...this.mapFilterForUpdate(result),
        ...this.mapEntityForUpdate(entity)
      };      
      return this.http
        .put<Comunidad>(
          this.updateUrl,
          entityUpdated,
          { headers: this.getHttpHeaders() }
        )
        .pipe(
          map((entityUpdated: Comunidad) => {
            entityUpdated = {
              ...entityUpdated,
              ...this.mapEntityIdForUpdate(entityUpdated),           
              ...this.mapUpdateResponseToEntity(entityUpdated),             
              ...this.getCommonAtributes(entityUpdated),
            } as Comunidad;  
            return entityUpdated;
          }),
          tap((_) => {
            if (spinnerActivate) {
              this.stopSpinner();
            }
            if (showMessage && this.showMessage) {
              this.utilService.showAlertSuccess("toaster.editok");
            }
            this.showMessage = true;
          })
        );
    } else {
      return this.updateEntityToMemory(entity, spinnerActivate, showMessage);
    }
  }  

  getCommonAtributes(item: Comunidad): any {
    return{
      comboLabel: item?.nombre,
      type: "comunidad",
      module: "territorio",
      version: 0,
    }
  }  

  mapEntityId(item: any): any {
    return (item.id = {
              idEntidad: item?.idEntidad,        
              idComunidad: item?.idComunidad        
    });
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

  mapFilterForSearch(filter: ComunidadFilter): any{
    return filter;
  };

  mapFilterForDelete(result: any) {
    return {
        idEntidad: result["idEntidad"],        
        idComunidad: result["idComunidad"]        
      };
  }  

  mapFilterForGet(result: any) {
    return {
        idEntidad: result["idEntidad"],        
        idComunidad: result["idComunidad"]        
     };
  }  

  mapFilterForUpdate(result: any) {
    return {
        idEntidad: result["idEntidad"],        
        idComunidad: result["idComunidad"]        
     };
  }    
  

  mapSearchResponseToEntity(response: Comunidad): any{
    return this.mapResponseToEntity(response);
  };

  mapEntityForAdd(entity: Comunidad): any{
    return entity;
  };

  mapAddResponseToEntity(response: Comunidad): any{
    return this.mapResponseToEntity(response);
  };

  mapEntityForUpdate(entity: Comunidad): any{
    return this.mapEntityForAdd(entity);
  };

  mapUpdateResponseToEntity(response: Comunidad): any{
    return this.mapResponseToEntity(response);
  };

  mapResponseToEntity(response: Comunidad): any{
    return response;
  };  
  
}

