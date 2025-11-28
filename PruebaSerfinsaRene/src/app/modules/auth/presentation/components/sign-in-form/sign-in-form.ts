import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomInput } from '../../../../../shared/components/custom-input/custom-input';
import { AuthControllerService } from '../../../infraestructure/auth.controller.service';
import { ILoginRequest } from '../../../domain/auth.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sign-in-form',
  imports: [ReactiveFormsModule, CustomInput],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div
        class="w-full max-w-sm bg-white p-6 rounded-xl shadow-md border border-gray-200"
      >
        <h1 class="text-xl font-semibold text-gray-800 mb-1">Iniciar sesión</h1>
        <p class="text-sm text-gray-500 mb-6">Accede con tu cuenta</p>

        <form [formGroup]="form" class="space-y-4">
          <app-custom-input
            type="email"
            [control]="f.email"
            [label]="'Correo'"
            [name]="'correo'"
            [placeholder]="'mail@mail.com'"
          />

          <app-custom-input
            type="password"
            [control]="f.password"
            [label]="'Contraseña'"
            [name]="'password'"
            [placeholder]="'Ingrese su clave'"
          />

          <button
            (click)="onSubmit()"
            type="button"
            [disabled]="loading()"
            class="w-full bg-blue-600 mt-3 text-white py-2 rounded-lg text-sm cursor-pointer font-medium
               hover:bg-blue-700 disabled:opacity-60 transition"
          >
            @if (!loading()) { Iniciar sesión } @else { Procesando... }
          </button>
        </form>
      </div>
    </div>
  `,
  styleUrl: './sign-in-form.css',
})
export class SignInForm {
  private fb = inject(FormBuilder);
  controller = inject(AuthControllerService);
  toast = inject(ToastrService);
  service = inject(AuthService);
  router = inject(Router);

  loading = signal(false);
  submitted = signal(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.set(true);
    this.loading.set(true);

    const data: ILoginRequest = {
      email: this.f.email.value!,
      password: this.f.password.value!,
    };

    this.controller.signIn(data).subscribe({
      next: (res) => {
        this.toast.success('Sesion iniciada', 'Bienvenido');
        this.service.authState.set({
          isAuthenticated: true,
          token: res.token,
          name: this.f.email.value!,
          email: this.f.email.value!,
        });
        localStorage.setItem('token', res.token);
        localStorage.setItem(
          'user',
          JSON.stringify({
            isAuthenticated: true,
            token: res.token,
            name: this.f.email.value!,
            email: this.f.email.value!,
          })
        );
        this.loading.set(false);
        this.submitted.set(false);
        this.router.navigate(['/products']);
      },
      error: () => {
        this.toast.error(
          'Error al iniciar sesion',
          'Intentelo de nuevo mas tarde'
        );
        this.loading.set(false);
        this.submitted.set(false);
      },
    });
  }
}
