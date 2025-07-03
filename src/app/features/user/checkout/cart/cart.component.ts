import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';
import { CartItem } from '../../../../shared/models/cart-item.model';
import { CheckoutStepsComponent } from '../../../../shared/components/checkout-steps/checkout-steps.component'; // 👈 agrega esta línea

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    CheckoutStepsComponent // 👈 agrega esto a imports
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  total = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.actualizarCarrito();
  }

  actualizarCarrito(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.calcularTotal();
  }

  eliminarItem(id: number): void {
    this.cartService.eliminarProducto(id);
    this.actualizarCarrito();
  }

  vaciarCarrito(): void {
    this.cartService.vaciarCarrito();
    this.actualizarCarrito();
  }

  continuar(): void {
    this.router.navigate(['/user/checkout/shipping']);
  }

  incrementarCantidad(id: number): void {
    this.cartService.cambiarCantidad(id, 1);
    this.actualizarCarrito();
  }

  disminuirCantidad(id: number): void {
    this.cartService.cambiarCantidad(id, -1);
    this.actualizarCarrito();
  }
}
