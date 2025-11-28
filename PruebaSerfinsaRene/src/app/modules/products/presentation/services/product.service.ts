import { Injectable, signal } from '@angular/core';
import { IProduct } from '../../domain/products.model';
import { TableColumn } from '../../../../shared/components/generic-table/generic-table';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  data = signal<IProduct[]>([]);
  loading = signal(false);

  columns: TableColumn<IProduct>[] = [
    {
      key: 'id',
      header: 'ID',
      align: 'center',
    },
    {
      key: 'name',
      header: 'Nombre',
    },
    {
      key: 'description',
      header: 'Descripción',
      cellClass: 'max-w-[280px] truncate',
    },
    {
      key: 'price',
      header: 'Precio ($)',
      align: 'right',
      cell: (p) => p.price.toFixed(2),
      cellClass: 'font-medium',
    },
    {
      key: 'stock',
      header: 'Stock',
      align: 'center',
    },
    {
      key: 'productTypeName',
      header: 'Tipo',
      align: 'center',
    },
    {
      key: 'createdBy',
      header: 'Creado por',
      align: 'center',
    },
  ];

  constructor() {}
}
