import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = !!localStorage.getItem('token');
  if (!isAuthenticated) {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
