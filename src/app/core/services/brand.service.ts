import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../../shared/models/brand.model';

@Injectable({ providedIn: 'root' })
export class BrandService {
  private apiUrl = 'http://localhost:8080/api/brands';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }
}
