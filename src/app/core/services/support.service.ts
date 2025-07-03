import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupportRequest } from '../../shared/models/support-request.model';

@Injectable({ providedIn: 'root' })
export class SupportService {
  private baseUrl = 'http://localhost:8080/api/support';

  constructor(private http: HttpClient) {}

  enviarSolicitud(data: SupportRequest): Observable<SupportRequest> {
    return this.http.post<SupportRequest>(this.baseUrl, data);
  }

  listarSolicitudesUsuario(): Observable<SupportRequest[]> {
    return this.http.get<SupportRequest[]>(`${this.baseUrl}/mis-solicitudes`);
  }

  listarTodas(): Observable<SupportRequest[]> {
    return this.http.get<SupportRequest[]>(this.baseUrl);
  }

  cambiarEstado(id: number, nuevoEstado: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}`, { estado: nuevoEstado });
  }
}
