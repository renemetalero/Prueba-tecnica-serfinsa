import { inject, Injectable } from '@angular/core';
import { IProductsRepository } from '../domain/products.repository';
import { catchError, Observable, of } from 'rxjs';
import { IProduct, ICreateProduct } from '../domain/products.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductInfraestructureService implements IProductsRepository {
  http = inject(HttpClient);

  findAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.BASE_URL}/products`)
  }
  create(data: ICreateProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${environment.BASE_URL}/products`, data);
  }
  findById(id: number): Observable<IProduct> {
    return this.http
      .get<IProduct>(`${environment.BASE_URL}/products/${id}`)
      .pipe(
        catchError((err) => {
          return of({
            id: 1,
            name: 'Laptop Lenovo ThinkPad X1 Carbon',
            description: 'Ultrabook de alto rendimiento con Intel i7',
            price: 1299.99,
            stock: 50,
            productTypeId: 1,
            productTypeName: 'ELECTRONICA',
            createdBy: 1,
          });
        })
      );
  }
}
