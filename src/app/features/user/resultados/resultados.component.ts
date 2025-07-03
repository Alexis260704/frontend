import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/product.model';
import { CartService } from '../../../core/services/cart.service';

@Component({
  standalone: true,
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class ResultadosComponent implements OnInit {
  productos: Product[] = [];
  loading = true;
  currentCategory = '';
  currentSearch = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const name = params['name'] || '';
      const brand = params['brand'] || '';
      const category = params['category'] || '';

      this.currentSearch = name || brand;
      this.currentCategory = category;

      this.loading = true;
      this.productService.search(name, category, brand).subscribe({
        next: (productos) => {
          this.productos = productos;
          this.loading = false;
        },
        error: () => this.loading = false
      });
    });
  }

  agregarAlCarrito(producto: Product): void {
  this.cartService.agregarProducto(producto, 1);
  }

}
