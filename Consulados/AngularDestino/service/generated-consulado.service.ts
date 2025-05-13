import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { tap } from "rxjs/internal/operators/tap";
import { map } from 'rxjs/internal/operators/map';
import { Subject } from 'rxjs/internal/Subject';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { environment } from '../../../../../environments/environment';
import { BaseService, SortType, AlertType, PaginationPage, GenericopBean, PageEvent } from "@jnum/jnum-core";
import { Consulado } from '../../../../customized/territorio/consulado/model/consulado';
import { ConsuladoFilter } from '../../../../customized/territorio/consulado/filter/consulado-filter';
import { IgmUtilService } from '../../../../jnum-core/services/igm-util.service';
/**
 * Servicio generado Consulado
 * @implements {OnInit}
 */
@Injectable({
    providedIn: 'root',
})
export abstract class GeneratedConsuladoService extends BaseService<Consulado> implements OnInit{
 
  private _consuladoCached!: Observable<PaginationPage<Consulado>> | null;      
  private _reloadConsuladoSubject: Subject<boolean>= new Subject();  

  searchUrl:string= `${environment.serviceUrl}/api/territorio/Consulado/Buscar`;
  deleteUrl:string = `${environment.serviceUrl}/api/territorio/Consulado/Eliminar`;
  addUrl:string = `${environment.serviceUrl}/api/territorio/Consulado/Insertar`;
  editUrl:string = `${environment.serviceUrl}/api/territorio/Consulado/Cargar`;
  updateUrl:string = `${environment.serviceUrl}/api/territorio/Consulado/Actualizar`;
     
    
  /**
   * @constructor
   */
  constructor(protected igmUtilService:IgmUtilService) {
    super();
    this.memcollection = "mconsulados";
    this.url = environment.serviceUrl+'/territorio/consulado';
  }
  
  /**
   * @returns void
   */
  ngOnInit(): void {}    
    
    
  /**
     * Get reload Consulado Subject
     * 
   * @returns Observable
   */
  public getReloadConsuladoSubject(): Observable<boolean> {
    return this._reloadConsuladoSubject.asObservable();
  }

  /**
     * Set reload Consulado Subject
     * 
   * @param  {boolean} reload
   */
  public setReloadConsuladoSubject(reload:boolean) {
    this._reloadConsuladoSubject.next(reload);
  }
    
  /**
   * Clear the cache
   */    
  override clearCache(){
    this.consuladoCached=null;
  }

  /**
   * Get all entities.
   * @returns Observable
   */    
  override getAllEntities(data?:any): Observable<any>{
    const consuladoFilter = new ConsuladoFilter();
    return this.searchEntitiesByFilter(consuladoFilter, Number.MAX_VALUE);
  }   


  /**
   * Get entities not paginated.
   * @returns Observable
   */    
  override searchEntitiesByFilterNoPaginated(consuladoFilter: ConsuladoFilter,
    sort?: SortType):  Observable<PaginationPage<Consulado>>{
    return this.searchEntitiesByFilter(consuladoFilter,Number.MAX_VALUE,null,sort);
  }     
    
                


  override guid(consulado:Consulado) {
    let embeddedid = {    
          idEntidad: Math.floor((1 + Math.random()) * 0x10000),
          idConsulado: Math.floor((1 + Math.random()) * 0x10000),
    }
    consulado.id=embeddedid;
  }


    /**
     * Getter consuladoCached
     * @return {Observable<PaginationPage<Consulado>>}
     */
    public get consuladoCached(): Observable<PaginationPage<Consulado>> | null {
        return this._consuladoCached;
    }

    /**
     * Setter consuladoCached
     * @param {Observable<PaginationPage<Consulado>>} value
     */
    public set consuladoCached(value: Observable<PaginationPage<Consulado>> | null) {
        this._consuladoCached = value;
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
  ): Observable<Consulado> {
    const keys = ["idEntidad","idConsulado"];
    const result = this.igmUtilService.splitId(keys, id);
    this.clearCache();
    if (spinnerActivate) {
      this.startSpinner();
    }
    if (!this.memory) {
      const filterAux = this.mapFilterForDelete(result);
      return this.http
        .delete<Consulado>(this.deleteUrl, {
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
   * @param  {ConsuladoFilter} filter
   * @param  {number} pageSize
   * @param  {PageEvent} event?
   * @param  {SortType} sort?
   * @param  {boolean} disable
   * @returns {Observable<PaginationPage<Consulado>>}
   */
  override searchEntitiesByFilter(
    filter: ConsuladoFilter,
    pageSize: number,
    event?: PageEvent | null,
    sort?: SortType,
    disable: boolean = false
  ): Observable<PaginationPage<Consulado>> {    
    const filterAux = this.mapFilterForSearch(filter);
    if (!disable) {
      this.startSpinner();
    }
    return this.http
      .post<Array<Consulado>>(
        this.igmUtilService.buildUrl(
          this.searchUrl,
          event,
          sort
        ),
        filterAux,
        { headers: this.getHttpHeaders() }
      )
      .pipe(
        map((response: Consulado[]) => {
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
          } as PaginationPage<Consulado>;
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
   * @param  {Consulado} entity
   * @param {boolean} [showMessage=true]
   * @param {boolean} [spinnerActivate=true]
   * @returns {Observable<Consulado>}
   */
  override addEntity(
    entity: Consulado,
    showMessage: boolean = true,
    spinnerActivate: boolean = true
  ): Observable<Consulado> {
    this.clearCache();
    if (spinnerActivate) {
      this.startSpinner();
    }
    if (!this.memory) {
      return this.http
        .post<Consulado>(
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
            } as Consulado;             
            return entitynew;
          }),
          tap((entitynew: Consulado) => {
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
   * @returns {Observable<Consulado>}
   */
  override getEntity(id: string): Observable<Consulado> {
    const keys = ["idEntidad","idConsulado"];
    const result = this.igmUtilService.splitId(keys, id);
    if (!this.memory) {
      const filterAux = this.mapFilterForGet(result);
      return this.http
        .post<Consulado>(
          this.editUrl,
          filterAux,
          { headers: this.getHttpHeaders() }
        )
        .pipe(
          map((entityloaded: Consulado) => {
            entityloaded = {
              ...entityloaded,
              ...this.mapEntityIdForGet(entityloaded),            
              ...this.mapResponseToEntity(entityloaded),             
              ...this.getCommonAtributes(entityloaded),
            } as Consulado;  
            return entityloaded;
          })
        );
    } else {
      return this.http.get<Consulado>(
        `${this.MSERVER_URL + this.memcollection}/${this.replaceAll(
          id,
          "/",
          "-"
        )}`
      );
    }
  }  

  override updateEntity(
    entity: Consulado,
    id: any,
    showMessage: boolean = true,
    spinnerActivate: boolean = true
  ): Observable<object> {
    id = this.utilService.getEntityId(id);
    const keys = ["idEntidad","idConsulado"];
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
        .put<Consulado>(
          this.updateUrl,
          entityUpdated,
          { headers: this.getHttpHeaders() }
        )
        .pipe(
          map((entityUpdated: Consulado) => {
            entityUpdated = {
              ...entityUpdated,
              ...this.mapEntityIdForUpdate(entityUpdated),           
              ...this.mapUpdateResponseToEntity(entityUpdated),             
              ...this.getCommonAtributes(entityUpdated),
            } as Consulado;  
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

  getCommonAtributes(item: Consulado): any {
    return{
      comboLabel: item?.nombre,
      type: "consulado",
      module: "territorio",
      version: 0,
    }
  }  

  mapEntityId(item: any): any {
    return (item.id = {
              idEntidad: item?.idEntidad,        
              idConsulado: item?.idConsulado        
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

  mapFilterForSearch(filter: ConsuladoFilter): any{
    return filter;
  };

  mapFilterForDelete(result: any) {
    return {
        idEntidad: result["idEntidad"],        
        idConsulado: result["idConsulado"]        
      };
  }  

  mapFilterForGet(result: any) {
    return {
        idEntidad: result["idEntidad"],        
        idConsulado: result["idConsulado"]        
     };
  }  

  mapFilterForUpdate(result: any) {
    return {
        idEntidad: result["idEntidad"],        
        idConsulado: result["idConsulado"]        
     };
  }    
  

  mapSearchResponseToEntity(response: Consulado): any{
    return this.mapResponseToEntity(response);
  };

  mapEntityForAdd(entity: Consulado): any{
    return entity;
  };

  mapAddResponseToEntity(response: Consulado): any{
    return this.mapResponseToEntity(response);
  };

  mapEntityForUpdate(entity: Consulado): any{
    return this.mapEntityForAdd(entity);
  };

  mapUpdateResponseToEntity(response: Consulado): any{
    return this.mapResponseToEntity(response);
  };

  mapResponseToEntity(response: Consulado): any{
    return response;
  };  
  
}

