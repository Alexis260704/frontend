// src/app/features/admin/manage-products/manage-products.routes.ts
import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ProductFormComponent } from './product-form.component';

export const PRODUCT_ROUTES: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'form', component: ProductFormComponent },
  { path: 'form/:id', component: ProductFormComponent }
];
