import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pais } from '../models/pais.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  private apiUrl = `${environment.apiUrl}/paises`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de países según los filtros aplicados
   * @param nombre Filtro por nombre
   * @param mostrarNoActivos Flag para mostrar países no activos
   */
  buscarPaises(nombre?: string, mostrarNoActivos?: boolean): Observable<Pais[]> {
    let params = new HttpParams();
    
    if (nombre) {
      params = params.set('nombre', nombre);
    }
    
    if (mostrarNoActivos !== undefined) {
      params = params.set('mostrarNoActivos', mostrarNoActivos.toString());
    }
    
    return this.http.get<Pais[]>(this.apiUrl, { params });
  }

  /**
   * Obtiene un país por su id
   * @param id ID del país
   */
  getPais(id: number): Observable<Pais> {
    return this.http.get<Pais>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo país
   * @param pais Datos del país a crear
   */
  crearPais(pais: Pais): Observable<Pais> {
    return this.http.post<Pais>(this.apiUrl, pais);
  }

  /**
   * Actualiza un país existente
   * @param id ID del país
   * @param pais Datos actualizados del país
   */
  actualizarPais(id: number, pais: Pais): Observable<Pais> {
    return this.http.put<Pais>(`${this.apiUrl}/${id}`, pais);
  }

  /**
   * Elimina un país
   * @param id ID del país a eliminar
   */
  eliminarPais(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 