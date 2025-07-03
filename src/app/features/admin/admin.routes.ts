import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './manage-users/user-list.component';
import { UserFormComponent } from './manage-users/user-form.component';
import { ProductListComponent } from './manage-products/product-list.component';
import { ProductFormComponent } from './manage-products/product-form.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Admin Dashboard'
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'users/form/:id',
    component: UserFormComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'products/form',
    component: ProductFormComponent
  },
  {
    path: 'products/form/:id',
    component: ProductFormComponent
  }
];