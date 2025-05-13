import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { tap } from "rxjs/internal/operators/tap";
import { map } from 'rxjs/internal/operators/map';
import { Subject } from 'rxjs/internal/Subject';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { environment } from '../../../../../environments/environment';
import { BaseService, SortType, AlertType, PaginationPage, GenericopBean, PageEvent } from "@jnum/jnum-core";
import { Provincia } from '../../../../customized/territorio/provincia/model/provincia';
import { ProvinciaFilter } from '../../../../customized/territorio/provincia/filter/provincia-filter';
import { IgmUtilService } from '../../../../jnum-core/services/igm-util.service';
/**
 * Servicio generado Provincia
 * @implements {OnInit}
 */
@Injectable({
    providedIn: 'root',
})
export abstract class GeneratedProvinciaService extends BaseService<Provincia> implements OnInit{
 
  private _provinciaCached!: Observable<PaginationPage<Provincia>> | null;      
  private _reloadProvinciaSubject: Subject<boolean>= new Subject();  

  searchUrl:string= `${environment.serviceUrl}/api/territorio/Provincia/Buscar`;
  deleteUrl:string = `${environment.serviceUrl}/api/territorio/Provincia/Eliminar`;
  addUrl:string = `${environment.serviceUrl}/api/territorio/Provincia/Insertar`;
  editUrl:string = `${environment.serviceUrl}/api/territorio/Provincia/Cargar`;
  updateUrl:string = `${environment.serviceUrl}/api/territorio/Provincia/Actualizar`;
     
    
  /**
   * @constructor
   */
  constructor(protected igmUtilService:IgmUtilService) {
    super();
    this.memcollection = "mprovincias";
    this.url = environment.serviceUrl+'/territorio/provincia';
  }
  
  /**
   * @returns void
   */
  ngOnInit(): void {}    
    
    
  /**
     * Get reload Provincia Subject
     * 
   * @returns Observable
   */
  public getReloadProvinciaSubject(): Observable<boolean> {
    return this._reloadProvinciaSubject.asObservable();
  }

  /**
     * Set reload Provincia Subject
     * 
   * @param  {boolean} reload
   */
  public setReloadProvinciaSubject(reload:boolean) {
    this._reloadProvinciaSubject.next(reload);
  }
    
  /**
   * Clear the cache
   */    
  override clearCache(){
    this.provinciaCached=null;
  }

  /**
   * Get all entities.
   * @returns Observable
   */    
  override getAllEntities(data?:any): Observable<any>{
    const provinciaFilter = new ProvinciaFilter();
    return this.searchEntitiesByFilter(provinciaFilter, Number.MAX_VALUE);
  }   


  /**
   * Get entities not paginated.
   * @returns Observable
   */    
  override searchEntitiesByFilterNoPaginated(provinciaFilter: ProvinciaFilter,
    sort?: SortType):  Observable<PaginationPage<Provincia>>{
    return this.searchEntitiesByFilter(provinciaFilter,Number.MAX_VALUE,null,sort);
  }     
    
                

    obtenerProvinciaByCodigo(codigo: string, event?: PageEvent): Observable<any> {
        return this.http.get<any>(this.url + "/getbycodigo/" + codigo , { headers: this.getHttpHeaders() });
    }                

  override guid(provincia:Provincia) {
    let embeddedid = {    
          idEntidad: Math.floor((1 + Math.random()) * 0x10000),
          idProvincia: Math.floor((1 + Math.random()) * 0x10000),
    }
    provincia.id=embeddedid;
  }


    /**
     * Getter provinciaCached
     * @return {Observable<PaginationPage<Provincia>>}
     */
    public get provinciaCached(): Observable<PaginationPage<Provincia>> | null {
        return this._provinciaCached;
    }

    /**
     * Setter provinciaCached
     * @param {Observable<PaginationPage<Provincia>>} value
     */
    public set provinciaCached(value: Observable<PaginationPage<Provincia>> | null) {
        this._provinciaCached = value;
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
  ): Observable<Provincia> {
    const keys = ["idEntidad","idProvincia"];
    const result = this.igmUtilService.splitId(keys, id);
    this.clearCache();
    if (spinnerActivate) {
      this.startSpinner();
    }
    if (!this.memory) {
      const filterAux = this.mapFilterForDelete(result);
      return this.http
        .delete<Provincia>(this.deleteUrl, {
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
   * @param  {ProvinciaFilter} filter
   * @param  {number} pageSize
   * @param  {PageEvent} event?
   * @param  {SortType} sort?
   * @param  {boolean} disable
   * @returns {Observable<PaginationPage<Provincia>>}
   */
  override searchEntitiesByFilter(
    filter: ProvinciaFilter,
    pageSize: number,
    event?: PageEvent | null,
    sort?: SortType,
    disable: boolean = false
  ): Observable<PaginationPage<Provincia>> {    
    const filterAux = this.mapFilterForSearch(filter);
    if (!disable) {
      this.startSpinner();
    }
    return this.http
      .post<Array<Provincia>>(
        this.igmUtilService.buildUrl(
          this.searchUrl,
          event,
          sort
        ),
        filterAux,
        { headers: this.getHttpHeaders() }
      )
      .pipe(
        map((response: Provincia[]) => {
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
          } as PaginationPage<Provincia>;
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
   * @param  {Provincia} entity
   * @param {boolean} [showMessage=true]
   * @param {boolean} [spinnerActivate=true]
   * @returns {Observable<Provincia>}
   */
  override addEntity(
    entity: Provincia,
    showMessage: boolean = true,
    spinnerActivate: boolean = true
  ): Observable<Provincia> {
    this.clearCache();
    if (spinnerActivate) {
      this.startSpinner();
    }
    if (!this.memory) {
      return this.http
        .post<Provincia>(
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
            } as Provincia;             
            return entitynew;
          }),
          tap((entitynew: Provincia) => {
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
   * @returns {Observable<Provincia>}
   */
  override getEntity(id: string): Observable<Provincia> {
    const keys = ["idEntidad","idProvincia"];
    const result = this.igmUtilService.splitId(keys, id);
    if (!this.memory) {
      const filterAux = this.mapFilterForGet(result);
      return this.http
        .post<Provincia>(
          this.editUrl,
          filterAux,
          { headers: this.getHttpHeaders() }
        )
        .pipe(
          map((entityloaded: Provincia) => {
            entityloaded = {
              ...entityloaded,
              ...this.mapEntityIdForGet(entityloaded),            
              ...this.mapResponseToEntity(entityloaded),             
              ...this.getCommonAtributes(entityloaded),
            } as Provincia;  
            return entityloaded;
          })
        );
    } else {
      return this.http.get<Provincia>(
        `${this.MSERVER_URL + this.memcollection}/${this.replaceAll(
          id,
          "/",
          "-"
        )}`
      );
    }
  }  

  override updateEntity(
    entity: Provincia,
    id: any,
    showMessage: boolean = true,
    spinnerActivate: boolean = true
  ): Observable<object> {
    id = this.utilService.getEntityId(id);
    const keys = ["idEntidad","idProvincia"];
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
        .put<Provincia>(
          this.updateUrl,
          entityUpdated,
          { headers: this.getHttpHeaders() }
        )
        .pipe(
          map((entityUpdated: Provincia) => {
            entityUpdated = {
              ...entityUpdated,
              ...this.mapEntityIdForUpdate(entityUpdated),           
              ...this.mapUpdateResponseToEntity(entityUpdated),             
              ...this.getCommonAtributes(entityUpdated),
            } as Provincia;  
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

  getCommonAtributes(item: Provincia): any {
    return{
      comboLabel: item?.nombre,
      type: "provincia",
      module: "territorio",
      version: 0,
    }
  }  

  mapEntityId(item: any): any {
    return (item.id = {
              idEntidad: item?.idEntidad,        
              idProvincia: item?.idProvincia        
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

  mapFilterForSearch(filter: ProvinciaFilter): any{
    return filter;
  };

  mapFilterForDelete(result: any) {
    return {
        idEntidad: result["idEntidad"],        
        idProvincia: result["idProvincia"]        
      };
  }  

  mapFilterForGet(result: any) {
    return {
        idEntidad: result["idEntidad"],        
        idProvincia: result["idProvincia"]        
     };
  }  

  mapFilterForUpdate(result: any) {
    return {
        idEntidad: result["idEntidad"],        
        idProvincia: result["idProvincia"]        
     };
  }    
  

  mapSearchResponseToEntity(response: Provincia): any{
    return this.mapResponseToEntity(response);
  };

  mapEntityForAdd(entity: Provincia): any{
    return entity;
  };

  mapAddResponseToEntity(response: Provincia): any{
    return this.mapResponseToEntity(response);
  };

  mapEntityForUpdate(entity: Provincia): any{
    return this.mapEntityForAdd(entity);
  };

  mapUpdateResponseToEntity(response: Provincia): any{
    return this.mapResponseToEntity(response);
  };

  mapResponseToEntity(response: Provincia): any{
    return response;
  };  
  
}

