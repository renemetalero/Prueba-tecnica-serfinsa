import { Component, inject, OnInit } from '@angular/core';
import { ProductControllerService } from '../../../infraestructure/product.controller.service';
import { ProductService } from '../../services/product.service';
import { GenericTableComponent } from '../../../../../shared/components/generic-table/generic-table';
import { IProduct } from '../../../domain/products.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-page',
  imports: [GenericTableComponent],
  template: `
    <div class="w-full mx-auto justify-center p-20">
      <h2 class="text-2xl font-normal mb-8">Productos</h2>
      <div class="flex justify-end mb-4">
        <button
          (click)="router.navigateByUrl('/products/create')"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium 
         hover:bg-blue-700 active:bg-blue-800 transition-colors"
        >
          Nuevo
        </button>
      </div>
      <app-generic-table
        [columns]="service.columns"
        [data]="service.data()"
        [rowId]="rowId"
      />
    </div>
  `,
})
export class ProductsPage implements OnInit {
  controller = inject(ProductControllerService);
  service = inject(ProductService);
  router = inject(Router);
  rowId = (row: IProduct) => row.id;

  ngOnInit(): void {
    this.controller.findAll().subscribe({
      next: (res) => {
        console.log(res);

        this.service.data.set(res);
      },
    });
  }
}
