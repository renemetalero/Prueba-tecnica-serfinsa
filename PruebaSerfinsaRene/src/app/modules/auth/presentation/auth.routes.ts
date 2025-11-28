import { Route } from '@angular/router';

export const AuthRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/sign-in-page/sign-in-page').then((m) => m.SignInPage),
  },
];
