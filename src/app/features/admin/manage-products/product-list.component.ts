import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(products => {
      // 🔁 Forzamos nueva referencia para que Angular detecte el cambio
      this.products = [...products];
    });
  }

  createProduct(): void {
    this.router.navigate(['/admin/manage-products/new']);
  }

  editProduct(id: number): void {
    this.router.navigate(['/admin/manage-products', id]);
  }

  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.delete(id).subscribe(() => {
        alert('✅ Producto eliminado con éxito');
        // ⏳ Esperamos un poco para que el backend procese antes de recargar
        setTimeout(() => {
          this.loadProducts();
        }, 500);
      });
    }
  }
}
