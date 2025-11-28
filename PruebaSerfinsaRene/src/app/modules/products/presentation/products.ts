import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/presentation/services/auth.service';

@Component({
  selector: 'app-products',
  imports: [RouterOutlet],
  template: ` <div class="flex justify-end items-center gap-6 mt-5 mr-5">
      <small class="font-semibold text-gray-500"
        >Logged in as: {{ authService.authState()?.email }}</small
      >
      <button
        type="submit"
        (click)="authService.logout()"
        class="px-4 cursor-pointer py-2 rounded-lg bg-red-600 text-white text-sm font-medium
             hover:bg-red-700 active:bg-red-800 transition-colors"
      >
        Logout
      </button>
    </div>
    <router-outlet />`,
})
export class Products {
  authService = inject(AuthService);

  constructor() {
    const data = JSON.parse(localStorage.getItem('user') || '');
    if (data) {
      this.authService.authState.set(data);
    }
  }
}
