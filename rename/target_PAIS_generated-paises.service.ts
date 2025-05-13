import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { tap } from "rxjs/internal/operators/tap";
import { map } from 'rxjs/internal/operators/map';
import { Subject } from 'rxjs/internal/Subject';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { environment } from '../../../../../environments/environment';
import { BaseService, SortType, AlertType, PaginationPage, GenericopBean, PageEvent } from "@jnum/jnum-core";
import { Paises } from '../../../../customized/territorio/paises/model/paises';
import { PaisesFilter } from '../../../../customized/territorio/paises/filter/paises-filter';
import { IgmUtilService } from '../../../../jnum-core/services/igm-util.service';
/**
 * Servicio generado Paises
 * @implements {OnInit}
 */
@Injectable({
    providedIn: 'root',
})
export abstract class GeneratedPaisesService extends BaseService<Paises> implements OnInit{
 
  private _paisesCached!: Observable<PaginationPage<Paises>> | null;      
  private _reloadPaisesSubject: Subject<boolean>= new Subject();  

  searchUrl:string= `${environment.serviceUrl}/api/territorio/Paises/Buscar`;
  deleteUrl:string = `${environment.serviceUrl}/api/territorio/Paises/Eliminar`;
  addUrl:string = `${environment.serviceUrl}/api/territorio/Paises/Insertar`;
  editUrl:string = `${environment.serviceUrl}/api/territorio/Paises/Cargar`;
  updateUrl:string = `${environment.serviceUrl}/api/territorio/Paises/Actualizar`;
     
    
  /**
   * @constructor
   */
  constructor(protected igmUtilService:IgmUtilService) {
    super();
    this.memcollection = "mpaisess";
    this.url = environment.serviceUrl+'/territorio/paises';
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
    const paisesFilter = new PaisesFilter();
    return this.searchEntitiesByFilter(paisesFilter, Number.MAX_VALUE);
  }   


  /**
   * Get entities not paginated.
   * @returns Observable
   */    
  override searchEntitiesByFilterNoPaginated(paisesFilter: PaisesFilter,
    sort?: SortType):  Observable<PaginationPage<Paises>>{
    return this.searchEntitiesByFilter(paisesFilter,Number.MAX_VALUE,null,sort);
  }     
    
                

    obtenerPaisesByCodigo(codigo: string, event?: PageEvent): Observable<any> {
        return this.http.get<any>(this.url + "/getbycodigo/" + codigo , { headers: this.getHttpHeaders() });
    }                

  override guid(paises:Paises) {
    let embeddedid = {    
          idEntidad: Math.floor((1 + Math.random()) * 0x10000),
          idPais: Math.floor((1 + Math.random()) * 0x10000),
    }
    paises.id=embeddedid;
  }


    /**
     * Getter paisesCached
     * @return {Observable<PaginationPage<Paises>>}
     */
    public get paisesCached(): Observable<PaginationPage<Paises>> | null {
        return this._paisesCached;
    }

    /**
     * Setter paisesCached
     * @param {Observable<PaginationPage<Paises>>} value
     */
    public set paisesCached(value: Observable<PaginationPage<Paises>> | null) {
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
  ): Observable<Paises> {
    const keys = ["idEntidad","idPais"];
    const result = this.igmUtilService.splitId(keys, id);
    this.clearCache();
    if (spinnerActivate) {
      this.startSpinner();
    }
    if (!this.memory) {
      const filterAux = this.mapFilterForDelete(result);
      return this.http
        .delete<Paises>(this.deleteUrl, {
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
   * @param  {PaisesFilter} filter
   * @param  {number} pageSize
   * @param  {PageEvent} event?
   * @param  {SortType} sort?
   * @param  {boolean} disable
   * @returns {Observable<PaginationPage<Paises>>}
   */
  override searchEntitiesByFilter(
    filter: PaisesFilter,
    pageSize: number,
    event?: PageEvent | null,
    sort?: SortType,
    disable: boolean = false
  ): Observable<PaginationPage<Paises>> {    
    const filterAux = this.mapFilterForSearch(filter);
    if (!disable) {
      this.startSpinner();
    }
    return this.http
      .post<Array<Paises>>(
        this.igmUtilService.buildUrl(
          this.searchUrl,
          event,
          sort
        ),
        filterAux,
        { headers: this.getHttpHeaders() }
      )
      .pipe(
        map((response: Paises[]) => {
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
          } as PaginationPage<Paises>;
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
   * @param  {Paises} entity
   * @param {boolean} [showMessage=true]
   * @param {boolean} [spinnerActivate=true]
   * @returns {Observable<Paises>}
   */
  override addEntity(
    entity: Paises,
    showMessage: boolean = true,
    spinnerActivate: boolean = true
  ): Observable<Paises> {
    this.clearCache();
    if (spinnerActivate) {
      this.startSpinner();
    }
    if (!this.memory) {
      return this.http
        .post<Paises>(
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
            } as Paises;             
            return entitynew;
          }),
          tap((entitynew: Paises) => {
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
   * @returns {Observable<Paises>}
   */
  override getEntity(id: string): Observable<Paises> {
    const keys = ["idEntidad","idPais"];
    const result = this.igmUtilService.splitId(keys, id);
    if (!this.memory) {
      const filterAux = this.mapFilterForGet(result);
      return this.http
        .post<Paises>(
          this.editUrl,
          filterAux,
          { headers: this.getHttpHeaders() }
        )
        .pipe(
          map((entityloaded: Paises) => {
            entityloaded = {
              ...entityloaded,
              ...this.mapEntityIdForGet(entityloaded),            
              ...this.mapResponseToEntity(entityloaded),             
              ...this.getCommonAtributes(entityloaded),
            } as Paises;  
            return entityloaded;
          })
        );
    } else {
      return this.http.get<Paises>(
        `${this.MSERVER_URL + this.memcollection}/${this.replaceAll(
          id,
          "/",
          "-"
        )}`
      );
    }
  }  

  override updateEntity(
    entity: Paises,
    id: any,
    showMessage: boolean = true,
    spinnerActivate: boolean = true
  ): Observable<object> {
    id = this.utilService.getEntityId(id);
    const keys = ["idEntidad","idPais"];
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
        .put<Paises>(
          this.updateUrl,
          entityUpdated,
          { headers: this.getHttpHeaders() }
        )
        .pipe(
          map((entityUpdated: Paises) => {
            entityUpdated = {
              ...entityUpdated,
              ...this.mapEntityIdForUpdate(entityUpdated),           
              ...this.mapUpdateResponseToEntity(entityUpdated),             
              ...this.getCommonAtributes(entityUpdated),
            } as Paises;  
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

  getCommonAtributes(item: Paises): any {
    return{
      comboLabel: item?.nombre,
      type: "paises",
      module: "territorio",
      version: 0,
    }
  }  

  mapEntityId(item: any): any {
    return (item.id = {
              idEntidad: item?.idEntidad,        
              idPais: item?.idPais        
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

  mapFilterForSearch(filter: PaisesFilter): any{
    return filter;
  };

  mapFilterForDelete(result: any) {
    return {
        idEntidad: result["idEntidad"],        
        idPais: result["idPais"]        
      };
  }  

  mapFilterForGet(result: any) {
    return {
        idEntidad: result["idEntidad"],        
        idPais: result["idPais"]        
     };
  }  

  mapFilterForUpdate(result: any) {
    return {
        idEntidad: result["idEntidad"],        
        idPais: result["idPais"]        
     };
  }    
  

  mapSearchResponseToEntity(response: Paises): any{
    return this.mapResponseToEntity(response);
  };

  mapEntityForAdd(entity: Paises): any{
    return entity;
  };

  mapAddResponseToEntity(response: Paises): any{
    return this.mapResponseToEntity(response);
  };

  mapEntityForUpdate(entity: Paises): any{
    return this.mapEntityForAdd(entity);
  };

  mapUpdateResponseToEntity(response: Paises): any{
    return this.mapResponseToEntity(response);
  };

  mapResponseToEntity(response: Paises): any{
    return response;
  };  
  
}

