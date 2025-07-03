import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../shared/models/order.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class OrderDetailComponent implements OnInit {
  pedido!: Order;
  estadoSeleccionado: string = '';
  mensaje = '';
  error = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getById(id, true).subscribe({
      next: (data) => {
        this.pedido = data;
        this.estadoSeleccionado = this.pedido.status;
      },
      error: () => {
        this.error = '❌ Error al obtener el detalle del pedido';
      }
    });
  }

  actualizarEstado(): void {
    if (!this.estadoSeleccionado || this.estadoSeleccionado === this.pedido.status) {
      return;
    }

    this.orderService.updateStatus(this.pedido.id, this.estadoSeleccionado).subscribe({
      next: () => {
        this.pedido.status = this.estadoSeleccionado as Order['status'];
        this.mensaje = '✅ Estado actualizado correctamente';
        this.error = '';
      },
      error: () => {
        this.error = '❌ Error al actualizar el estado del pedido';
        this.mensaje = '';
      }
    });
  }
}
