import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { loginGuard } from './core/guards/login-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: () =>
      import('./modules/auth/presentation/auth').then((m) => m.Auth),
    loadChildren: () =>
      import('./modules/auth/presentation/auth.routes').then(
        (m) => m.AuthRoutes
      ),
    canActivate: [loginGuard],
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./modules/products/presentation/products').then(
        (m) => m.Products
      ),
    loadChildren: () =>
      import('./modules/products/presentation/products.routes').then(
        (m) => m.ProductsRoutes
      ),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];
