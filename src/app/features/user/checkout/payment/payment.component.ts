import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';
import { OrderService } from '../../../../core/services/order.service';
import { CartItem } from '../../../../shared/models/cart-item.model';
import { OrderItemDto } from '../../../../shared/models/order-item.model';
import { CheckoutStepsComponent } from '../../../../shared/components/checkout-steps/checkout-steps.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckoutStepsComponent],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  items: CartItem[] = [];
  total = 0;
  mensaje = '';
  error = '';
  loading = false;

  paymentMethod: string = 'EFECTIVO';
  mostrarQR = false;
  mostrarSubida = false;
  comprobante: File | null = null;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.calcularTotal();
  }

  seleccionarMetodo(metodo: string): void {
    this.paymentMethod = metodo;
    this.mostrarQR = metodo === 'YAPE';
    this.mostrarSubida = false;
    this.comprobante = null;
  }

  activarSubida(): void {
    this.mostrarSubida = true;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.comprobante = input.files[0];
    }
  }

  confirmarCompra(): void {
  this.mensaje = '';
  this.error = '';
  this.loading = true;

  const shippingAddress = localStorage.getItem('shippingAddress');
  if (!shippingAddress) {
    this.error = '❌ No se encontró la dirección de envío. Por favor, vuelve al paso anterior.';
    this.loading = false;
    return;
  }

  const orderItems: OrderItemDto[] = this.items.map(item => ({
    productId: item.producto.id,
    quantity: item.cantidad
  }));

  const formData = new FormData();
  formData.append('shippingAddress', shippingAddress);
  formData.append('paymentMethod', this.paymentMethod);
  formData.append('items', new Blob([JSON.stringify(orderItems)], { type: 'application/json' })); // ✅ aquí
  if (this.comprobante) {
    formData.append('comprobante', this.comprobante);
  }

  this.orderService.createOrderWithFile(formData).subscribe({
    next: () => {
      this.mensaje = '✅ Pedido registrado correctamente';
      this.cartService.vaciarCarrito();
      localStorage.removeItem('shippingAddress');
      this.router.navigate(['/user/pedidos']);
    },
    error: (err) => {
      console.error('❌ Error al registrar orden:', err);
      this.error = 'Hubo un error al registrar tu pedido. Inténtalo nuevamente.';
      this.loading = false;
    }
  });
}
}
