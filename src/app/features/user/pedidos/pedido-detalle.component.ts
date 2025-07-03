import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../shared/models/order.model';

@Component({
  selector: 'app-pedido-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.scss']
})
export class PedidoDetalleComponent implements OnInit {
  pedido!: Order;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getById(id).subscribe({
      next: (data) => {
        this.pedido = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al obtener pedido:', err);
        this.error = 'No se pudo cargar el pedido.';
        this.loading = false;
      }
    });
  }
}
