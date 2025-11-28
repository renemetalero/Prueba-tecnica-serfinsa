import { inject, Injectable, signal } from '@angular/core';
import { ILoginResponse } from '../../domain/auth.model';
import { Router } from '@angular/router';
interface IAuthState extends ILoginResponse {
  name: string;
  email: string;
  isAuthenticated: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState = signal<IAuthState | null>(null);
  router = inject(Router);

  constructor() {}

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }
}
