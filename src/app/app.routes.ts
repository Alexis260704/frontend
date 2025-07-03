import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { UserGuard } from './core/guards/user.guard';

export const appRoutes: Routes = [
  // ✅ Página principal
  { path: '', redirectTo: 'tienda', pathMatch: 'full' },

  // ✅ Tienda pública
  {
    path: 'tienda',
    loadComponent: () => import('./features/user/tienda/tienda.component').then(m => m.TiendaComponent)
  },
  {
    path: 'tienda/:id',
    loadComponent: () => import('./features/user/tienda/producto-detalle/producto-detalle.component').then(m => m.ProductoDetalleComponent)
  },

  // ✅ Resultados de búsqueda (ruta pública)
  {
    path: 'resultados',
    loadComponent: () => import('./features/user/resultados/resultados.component').then(m => m.ResultadosComponent)
  },

  // ✅ Autenticación
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // ✅ Usuario autenticado
  {
    path: 'user',
    canActivate: [AuthGuard, UserGuard],
    children: [
      {
        path: 'checkout',
        loadChildren: () => import('./features/user/checkout/checkout.routes').then(m => m.checkoutRoutes)
      },
      {
        path: 'pedidos',
        loadComponent: () => import('./features/user/pedidos/pedidos.component').then(m => m.PedidosComponent)
      },
      {
        path: 'pedidos/:id',
        loadComponent: () => import('./features/user/pedidos/pedido-detalle.component').then(m => m.PedidoDetalleComponent)
      },
      {
        path: 'soporte',
        loadComponent: () => import('./features/user/soporte/soporte-list.component').then(m => m.SoporteListComponent)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./features/user/perfil/perfil.component').then(m => m.PerfilComponent)
      }

    ]
  },

  // ✅ Admin
  {
  path: 'admin',
  canActivate: [AuthGuard, AdminGuard],
  loadComponent: () => import('./features/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
  children: [
    {
      path: '',
      redirectTo: 'manage-users',
      pathMatch: 'full'
    },
    {
      path: 'manage-users',
      loadComponent: () => import('./features/admin/manage-users/user-list.component').then(m => m.UserListComponent)
    },
    {
      path: 'manage-users/new',
      loadComponent: () => import('./features/admin/manage-users/user-form.component').then(m => m.UserFormComponent)
    },
    {
      path: 'manage-users/:id',
      loadComponent: () => import('./features/admin/manage-users/user-form.component').then(m => m.UserFormComponent)
    },
    {
      path: 'manage-products',
      loadComponent: () => import('./features/admin/manage-products/product-list.component').then(m => m.ProductListComponent)
    },
    {
      path: 'manage-products/new',
      loadComponent: () => import('./features/admin/manage-products/product-form.component').then(m => m.ProductFormComponent)
    },
    {
      path: 'manage-products/:id',
      loadComponent: () => import('./features/admin/manage-products/product-form.component').then(m => m.ProductFormComponent)
    },
    {
      path: 'manage-orders',
      loadComponent: () => import('./features/admin/manage-orders/order-list.component').then(m => m.OrderListComponent)
    },
    {
      path: 'manage-orders/:id',
      loadComponent: () => import('./features/admin/manage-orders/order-detail.component').then(m => m.OrderDetailComponent)
    }
  ]
}
,

  // ✅ Ruta fallback
  { path: '**', redirectTo: 'tienda' }
];
