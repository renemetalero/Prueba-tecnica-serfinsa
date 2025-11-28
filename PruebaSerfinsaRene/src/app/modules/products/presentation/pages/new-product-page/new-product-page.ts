import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProduct } from '../../../domain/products.model';
import { CustomInput } from '../../../../../shared/components/custom-input/custom-input';
import { ProductControllerService } from '../../../infraestructure/product.controller.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product-page',
  imports: [CustomInput, ReactiveFormsModule],
  template: `
    <div class="w-[60%] mx-auto pt-10">
      <h3 class="text-2xl font-normal mb-4">Nuevo Producto</h3>
      <form
        [formGroup]="form"
        (ngSubmit)="onSubmit()"
        class="space-y-4 bg-white p-4 rounded-lg border border-gray-200"
      >
        <app-custom-input
          type="text"
          [control]="f.name"
          [label]="'Nombre'"
          [name]="'name'"
          [placeholder]="'Camiseta Nike Sport Dri-Fit'"
        />

        <app-custom-input
          type="text"
          [control]="f.description"
          [label]="'Descripción'"
          [name]="'description'"
          [placeholder]="'Camiseta deportiva transpirable...'"
        />

        <app-custom-input
          type="number"
          [control]="f.price"
          [label]="'Precio'"
          [name]="'price'"
          [placeholder]="'29.99'"
        />

        <app-custom-input
          type="number"
          [control]="f.stock"
          [label]="'Stock'"
          [name]="'stock'"
          [placeholder]="'120'"
        />

        <app-custom-input
          type="text"
          [control]="f.productTypeName"
          [label]="'Tipo de Producto'"
          [name]="'productTypeName'"
          [placeholder]="'ROPA'"
        />

        <app-custom-input
          type="number"
          [control]="f.createdBy"
          [label]="'Creado por (ID usuario)'"
          [name]="'createdBy'"
          [placeholder]="'1'"
        />

        <div class="pt-2 flex justify-end">
          <button
            type="submit"
            class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium
             hover:bg-blue-700 active:bg-blue-800 transition-colors"
          >
            Guardar producto
          </button>
        </div>
      </form>
    </div>
  `,
  styleUrl: './new-product-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProductPage {
  private fb = inject(FormBuilder);
  controller = inject(ProductControllerService);
  toast = inject(ToastrService);
  router = inject(Router);

  submitted = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    productTypeId: [1, [Validators.required, Validators.min(1)]],
    productTypeName: ['', [Validators.required]],
    createdBy: [0, [Validators.required, Validators.min(1)]],
  });

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value as IProduct;

    this.controller.create(value).subscribe({
      next: (res) => {
        this.toast.success('Producto Creado con extio');
        this.router.navigateByUrl('/products');
      },
      error: (er) => {
        this.toast.error(
          'Error al crear el producto',
          'Intentelo de nuevo mas tarde'
        );
      },
    });
  }
}
