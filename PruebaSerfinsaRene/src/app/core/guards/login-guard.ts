import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = !!localStorage.getItem('token');

  if (isAuthenticated) {
    router.navigate(['/products']);
    return false;
  }

  return true;
};
