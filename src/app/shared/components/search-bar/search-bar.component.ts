import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchControl = new FormControl('');
  showSuggestions = false;
  suggestions = {
    products: [] as string[],
    brands: [] as string[],
    categories: [] as string[]
  };

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => {
          const query = value ?? '';
          this.showSuggestions = query.length >= 2;
          return query.length >= 2
            ? this.productService.autocomplete(query)
            : of({ products: [], brands: [], categories: [] });
        })
      )
      .subscribe(data => {
        this.suggestions = data;
      });
  }

  buscar(): void {
    const query = this.searchControl.value?.trim();
    if (query) {
      this.router.navigate(['/resultados'], {
        queryParams: { name: query }
      });
      this.limpiar();
    }
  }

  seleccionarFiltro(tipo: 'product' | 'brand' | 'category', valor: string): void {
    const params: any = {};
    if (tipo === 'product') params.name = valor;
    if (tipo === 'brand') params.brand = valor;
    if (tipo === 'category') params.category = valor;

    this.router.navigate(['/resultados'], { queryParams: params });
    this.limpiar();
  }

  limpiar(): void {
    this.searchControl.setValue('');
    this.suggestions = { products: [], brands: [], categories: [] };
    this.showSuggestions = false;
  }

  @HostListener('document:click', ['$event'])
  cerrarSugerenciasFueraDelInput(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('app-search-bar');
    if (!clickedInside) {
      this.showSuggestions = false;
    }
  }
}
