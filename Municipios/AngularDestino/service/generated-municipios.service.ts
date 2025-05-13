import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { tap } from "rxjs/internal/operators/tap";
import { map } from 'rxjs/internal/operators/map';
import { Subject } from 'rxjs/internal/Subject';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { environment } from '../../../../../environments/environment';
import { BaseService, SortType, AlertType, PaginationPage, GenericopBean, PageEvent } from "@jnum/jnum-core";
import { Municipios } from '../../../../customized/territorio/municipios/model/municipios';
import { MunicipiosFilter } from '../../../../customized/territorio/municipios/filter/municipios-filter';
import { IgmUtilService } from '../../../../jnum-core/services/igm-util.service';
/**
 * Servicio generado Municipios
 * @implements {OnInit}
 */
@Injectable({
    providedIn: 'root',
})
export abstract class GeneratedMunicipiosService extends BaseService<Municipios> implements OnInit{
 
  private _municipiosCached!: Observable<PaginationPage<Municipios>> | null;      
  private _reloadMunicipiosSubject: Subject<boolean>= new Subject();  

  searchUrl:string= `${environment.serviceUrl}/api/territorio/Municipios/Buscar`;
  deleteUrl:string = `${environment.serviceUrl}/api/territorio/Municipios/Eliminar`;
  addUrl:string = `${environment.serviceUrl}/api/territorio/Municipios/Insertar`;
  editUrl:string = `${environment.serviceUrl}/api/territorio/Municipios/Cargar`;
  updateUrl:string = `${environment.serviceUrl}/api/territorio/Municipios/Actualizar`;
     
    
  /**
   * @constructor
   */
  constructor(protected igmUtilService:IgmUtilService) {
    super();
    this.memcollection = "mmunicipioss";
    this.url = environment.serviceUrl+'/territorio/municipios';
  }
  
  /**
   * @returns void
   */
  ngOnInit(): void {}    
    
    
  /**
     * Get reload Municipios Subject
     * 
   * @returns Observable
   */
  public getReloadMunicipiosSubject(): Observable<boolean> {
    return this._reloadMunicipiosSubject.asObservable();
  }

  /**
     * Set reload Municipios Subject
     * 
   * @param  {boolean} reload
   */
  public setReloadMunicipiosSubject(reload:boolean) {
    this._reloadMunicipiosSubject.next(reload);
  }
    
  /**
   * Clear the cache
   */    
  override clearCache(){
    this.municipiosCached=null;
  }

  /**
   * Get all entities.
   * @returns Observable
   */    
  override getAllEntities(data?:any): Observable<any>{
    const municipiosFilter = new MunicipiosFilter();
    return this.searchEntitiesByFilter(municipiosFilter, Number.MAX_VALUE);
  }   


  /**
   * Get entities not paginated.
   * @returns Observable
   */    
  override searchEntitiesByFilterNoPaginated(municipiosFilter: MunicipiosFilter,
    sort?: SortType):  Observable<PaginationPage<Municipios>>{
    return this.searchEntitiesByFilter(municipiosFilter,Number.MAX_VALUE,null,sort);
  }     
    
                

    obtenerMunicipiosByCodigoINE(codigoine: string, event?: PageEvent): Observable<any> {
        return this.http.get<any>(this.url + "/getbycodigoine/" + codigoine , { headers: this.getHttpHeaders() });
    }                

  override guid(municipios:Municipios) {
    let embeddedid = {    
          idEntidad: Math.floor((1 + Math.random()) * 0x10000),
          idMunicipio: Math.floor((1 + Math.random()) * 0x10000),
    }
    municipios.id=embeddedid;
  }


    /**
     * Getter municipiosCached
     * @return {Observable<PaginationPage<Municipios>>}
     */
    public get municipiosCached(): Observable<PaginationPage<Municipios>> | null {
        return this._municipiosCached;
    }

    /**
     * Setter municipiosCached
     * @param {Observable<PaginationPage<Municipios>>} value
     */
    public set municipiosCached(value: Observable<PaginationPage<Municipios>> | null) {
        this._municipiosCached = value;
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
  ): Observable<Municipios> {
    const keys = ["idEntidad","idMunicipio"];
    const result = this.igmUtilService.splitId(keys, id);
    this.clearCache();
    if (spinnerActivate) {
      this.startSpinner();
    }
    if (!this.memory) {
      const filterAux = this.mapFilterForDelete(result);
      return this.http
        .delete<Municipios>(this.deleteUrl, {
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
   * @param  {MunicipiosFilter} filter
   * @param  {number} pageSize
   * @param  {PageEvent} event?
   * @param  {SortType} sort?
   * @param  {boolean} disable
   * @returns {Observable<PaginationPage<Municipios>>}
   */
  override searchEntitiesByFilter(
    filter: MunicipiosFilter,
    pageSize: number,
    event?: PageEvent | null,
    sort?: SortType,
    disable: boolean = false
  ): Observable<PaginationPage<Municipios>> {    
    const filterAux = this.mapFilterForSearch(filter);
    if (!disable) {
      this.startSpinner();
    }
    return this.http
      .post<Array<Municipios>>(
        this.igmUtilService.buildUrl(
          this.searchUrl,
          event,
          sort
        ),
        filterAux,
        { headers: this.getHttpHeaders() }
      )
      .pipe(
        map((response: Municipios[]) => {
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
          } as PaginationPage<Municipios>;
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
   * @param  {Municipios} entity
   * @param {boolean} [showMessage=true]
   * @param {boolean} [spinnerActivate=true]
   * @returns {Observable<Municipios>}
   */
  override addEntity(
    entity: Municipios,
    showMessage: boolean = true,
    spinnerActivate: boolean = true
  ): Observable<Municipios> {
    this.clearCache();
    if (spinnerActivate) {
      this.startSpinner();
    }
    if (!this.memory) {
      return this.http
        .post<Municipios>(
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
            } as Municipios;             
            return entitynew;
          }),
          tap((entitynew: Municipios) => {
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
   * @returns {Observable<Municipios>}
   */
  override getEntity(id: string): Observable<Municipios> {
    const keys = ["idEntidad","idMunicipio"];
    const result = this.igmUtilService.splitId(keys, id);
    if (!this.memory) {
      const filterAux = this.mapFilterForGet(result);
      return this.http
        .post<Municipios>(
          this.editUrl,
          filterAux,
          { headers: this.getHttpHeaders() }
        )
        .pipe(
          map((entityloaded: Municipios) => {
            entityloaded = {
              ...entityloaded,
              ...this.mapEntityIdForGet(entityloaded),            
              ...this.mapResponseToEntity(entityloaded),             
              ...this.getCommonAtributes(entityloaded),
            } as Municipios;  
            return entityloaded;
          })
        );
    } else {
      return this.http.get<Municipios>(
        `${this.MSERVER_URL + this.memcollection}/${this.replaceAll(
          id,
          "/",
          "-"
        )}`
      );
    }
  }  

  override updateEntity(
    entity: Municipios,
    id: any,
    showMessage: boolean = true,
    spinnerActivate: boolean = true
  ): Observable<object> {
    id = this.utilService.getEntityId(id);
    const keys = ["idEntidad","idMunicipio"];
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
        .put<Municipios>(
          this.updateUrl,
          entityUpdated,
          { headers: this.getHttpHeaders() }
        )
        .pipe(
          map((entityUpdated: Municipios) => {
            entityUpdated = {
              ...entityUpdated,
              ...this.mapEntityIdForUpdate(entityUpdated),           
              ...this.mapUpdateResponseToEntity(entityUpdated),             
              ...this.getCommonAtributes(entityUpdated),
            } as Municipios;  
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

  getCommonAtributes(item: Municipios): any {
    return{
      comboLabel: item?.nombre,
      type: "municipios",
      module: "territorio",
      version: 0,
    }
  }  

  mapEntityId(item: any): any {
    return (item.id = {
              idEntidad: item?.idEntidad,        
              idMunicipio: item?.idMunicipio        
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

  mapFilterForSearch(filter: MunicipiosFilter): any{
    return filter;
  };

  mapFilterForDelete(result: any) {
    return {
        idEntidad: result["idEntidad"],        
        idMunicipio: result["idMunicipio"]        
      };
  }  

  mapFilterForGet(result: any) {
    return {
        idEntidad: result["idEntidad"],        
        idMunicipio: result["idMunicipio"]        
     };
  }  

  mapFilterForUpdate(result: any) {
    return {
        idEntidad: result["idEntidad"],        
        idMunicipio: result["idMunicipio"]        
     };
  }    
  

  mapSearchResponseToEntity(response: Municipios): any{
    return this.mapResponseToEntity(response);
  };

  mapEntityForAdd(entity: Municipios): any{
    return entity;
  };

  mapAddResponseToEntity(response: Municipios): any{
    return this.mapResponseToEntity(response);
  };

  mapEntityForUpdate(entity: Municipios): any{
    return this.mapEntityForAdd(entity);
  };

  mapUpdateResponseToEntity(response: Municipios): any{
    return this.mapResponseToEntity(response);
  };

  mapResponseToEntity(response: Municipios): any{
    return response;
  };  
  
}

