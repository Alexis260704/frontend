import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../core/services/category.service';
import { BrandService } from '../../../core/services/brand.service';
import { ProductService } from '../../../core/services/product.service';
import { Category } from '../../../shared/models/category.model';
import { Brand } from '../../../shared/models/brand.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  id: number | null = null;
  imageFile!: File;
  categories: Category[] = [];
  brands: Brand[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.loadData();

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      categoryId: [null, Validators.required],
      brandId: [null, Validators.required],
      featured: [false],
      file: [null]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.productService.getById(this.id).subscribe(product => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          categoryId: product.categoryId,
          brandId: product.brandId,
          featured: product.featured
        });
      });
    }
  }

  loadData(): void {
    this.categoryService.getAll().subscribe(data => this.categories = data);
    this.brandService.getAll().subscribe(data => this.brands = data);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('description', this.productForm.value.description);
    formData.append('price', this.productForm.value.price);
    formData.append('stock', this.productForm.value.stock);
    formData.append('categoryId', this.productForm.value.categoryId);
    formData.append('brandId', this.productForm.value.brandId);
    formData.append('featured', this.productForm.value.featured);
    if (this.imageFile) {
      formData.append('file', this.imageFile);
    }

    const isEditing = !!this.id;
    const request$ = isEditing
      ? this.productService.update(this.id!, formData)
      : this.productService.create(formData);

    request$.subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: isEditing ? 'Producto actualizado con éxito' : 'Producto creado con éxito',
        showConfirmButton: false,
        timer: 1200
      }).then(() => {
        this.router.navigate(['/admin/manage-products']);
      });
    });
  }
}
