import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component'; // ✅ IMPORTACIÓN

import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { BrandService } from '../../../core/services/brand.service';
import { Product } from '../../../shared/models/product.model';

@Component({
  standalone: true,
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
  imports: [
    CommonModule,
    SearchBarComponent,
    FormsModule
  ]
})
export class TiendaComponent implements OnInit {
  featuredProducts: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;

  // Filtros
  nameFilter = '';
  categoryFilter = '';
  brandFilter = '';

  categories: { id: number, name: string }[] = [];
  brands: { id: number, name: string }[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute // <-- para leer los filtros desde la URL
  ) {}

  ngOnInit(): void {
    this.loadFeatured();
    this.loadCategories();
    this.loadBrands();

    // Leer filtros desde queryParams
    this.route.queryParams.subscribe(params => {
      this.nameFilter = params['name'] || '';
      this.categoryFilter = params['category'] || '';
      this.brandFilter = params['brand'] || '';

      if (this.nameFilter || this.categoryFilter || this.brandFilter) {
        this.onSearch();
      }
    });
  }

  loadFeatured() {
    this.productService.getFeaturedProducts().subscribe({
      next: (products) => {
        this.featuredProducts = products.slice(0, 4);
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al obtener productos destacados:', err);
        this.loading = false;
      }
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (categories) => this.categories = categories
    });
  }

  loadBrands() {
    this.brandService.getAll().subscribe({
      next: (brands) => this.brands = brands
    });
  }

  onSearch(): void {
    this.loading = true;
    this.productService.search(this.nameFilter, this.categoryFilter, this.brandFilter).subscribe({
      next: (products) => {
        this.filteredProducts = products;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error en búsqueda:', err);
        this.loading = false;
      }
    });
  }

  goToProduct(id: number): void {
    this.router.navigate(['/tienda', id]);
  }
 irACategoria(nombre: string): void {
  this.router.navigate(['/resultados'], {
    queryParams: { category: nombre }
  });
}


}