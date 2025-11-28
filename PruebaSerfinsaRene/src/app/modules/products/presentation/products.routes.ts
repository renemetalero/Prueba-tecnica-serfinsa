import { Route } from '@angular/router';

export const ProductsRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () =>
      import('./pages/products-page/products-page').then((m) => m.ProductsPage),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/new-product-page/new-product-page').then(
        (m) => m.NewProductPage
      ),
  },
];
