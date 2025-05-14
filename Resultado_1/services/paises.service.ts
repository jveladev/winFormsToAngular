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

  getPaises(filtro?: { nombre?: string, mostrarNoActivos?: boolean }): Observable<Pais[]> {
    let params = new HttpParams();
    
    if (filtro?.nombre) {
      params = params.set('nombre', filtro.nombre);
    }
    
    if (filtro?.mostrarNoActivos !== undefined) {
      params = params.set('mostrarNoActivos', filtro.mostrarNoActivos.toString());
    }

    return this.http.get<Pais[]>(this.apiUrl, { params });
  }

  getPais(id: number): Observable<Pais> {
    return this.http.get<Pais>(`${this.apiUrl}/${id}`);
  }

  crearPais(pais: Pais): Observable<Pais> {
    return this.http.post<Pais>(this.apiUrl, pais);
  }

  actualizarPais(id: number, pais: Pais): Observable<Pais> {
    return this.http.put<Pais>(`${this.apiUrl}/${id}`, pais);
  }

  eliminarPais(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}