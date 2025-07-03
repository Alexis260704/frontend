import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private adminUrl = 'http://localhost:8080/api/admin/products';
  private publicUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  // 🔐 ADMIN
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.adminUrl);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.adminUrl}/${id}`);
  }

  create(formData: FormData): Observable<Product> {
    return this.http.post<Product>(this.adminUrl, formData);
  }

  update(id: number, formData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.adminUrl}/${id}`, formData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminUrl}/${id}`);
  }

  // 🌐 PÚBLICO: productos destacados
  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.publicUrl}/featured`);
  }

  search(name?: string, category?: string, brand?: string): Observable<Product[]> {
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (category) params.append('category', category);
    if (brand) params.append('brand', brand);
    return this.http.get<Product[]>(`${this.publicUrl}/search?${params.toString()}`);
  }

  // ✅ Nuevo: autocompletado inteligente
  autocomplete(query: string): Observable<{ products: string[]; brands: string[]; categories: string[] }> {
    return this.http.get<{ products: string[]; brands: string[]; categories: string[] }>(
      `${this.publicUrl}/autocomplete?query=${encodeURIComponent(query)}`
    );
  }
  // 🔓 Para clientes (usado en producto-detalle.component.ts)
  getPublicById(id: number): Observable<Product> {
  return this.http.get<Product>(`${this.publicUrl}/${id}`);
}
}
