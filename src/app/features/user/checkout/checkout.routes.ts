import { Routes } from '@angular/router';

export const checkoutRoutes: Routes = [
  {
    path: '',
    redirectTo: 'cart',
    pathMatch: 'full'
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'shipping',
    loadComponent: () => import('./shipping/shipping.component').then(m => m.ShippingComponent)
  },
  {
    path: 'payment',
    loadComponent: () => import('./payment/payment.component').then(m => m.PaymentComponent)
  }
];
