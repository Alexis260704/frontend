import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../shared/models/order.model';
import { OrderItemDto } from '../../shared/models/order-item.model'; // Asegúrate de que este archivo exista

@Injectable({ providedIn: 'root' })
export class OrderService {
  private baseUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  getById(id: number, isAdmin: boolean = false): Observable<Order> {
  const url = isAdmin
    ? `${this.baseUrl}/admin/${id}` // para administrador
    : `${this.baseUrl}/${id}`;      // para cliente
  return this.http.get<Order>(url);
  }


  create(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order);
  }

  getByUser(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/my`);
  }

  // ✅ Nuevo método para enviar pedido completo (usuario autenticado)
  createOrder(payload: {
  shippingAddress: string;
  items: OrderItemDto[];
  paymentMethod: string;
  }): Observable<Order> {
  return this.http.post<Order>(this.baseUrl, payload);
  }

  getMyOrders(): Observable<Order[]> {
  return this.http.get<Order[]>(`${this.baseUrl}/my`);
  }
  getUserOrders(): Observable<Order[]> {
  return this.http.get<Order[]>(`${this.baseUrl}/my`);
  }
  updateStatus(orderId: number, status: string): Observable<any> {
  return this.http.patch(`${this.baseUrl}/${orderId}/status`, { status });
  }
  createOrderWithFile(formData: FormData): Observable<Order> {
  return this.http.post<Order>('http://localhost:8080/api/orders/con-comprobante', formData);
  }

}
