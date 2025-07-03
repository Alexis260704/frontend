import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../shared/models/product.model';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  standalone: true,
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.scss'],
  imports: [CommonModule]
})
export class ProductoDetalleComponent implements OnInit {
  producto!: Product;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.productService.getPublicById(id).subscribe({
    next: (data) => {
      this.producto = data;
      this.loading = false;
    },
    error: () => {
      this.loading = false;
      this.router.navigate(['/tienda']);
    }
  });
}


  volver(): void {
    this.router.navigate(['/resultados'], {
      queryParamsHandling: 'preserve' // conserva los filtros
    });
  }
  agregarAlCarrito(): void {
  this.cartService.agregarProducto(this.producto, 1);
  alert('🛒 Producto añadido al carrito');
  }

}
