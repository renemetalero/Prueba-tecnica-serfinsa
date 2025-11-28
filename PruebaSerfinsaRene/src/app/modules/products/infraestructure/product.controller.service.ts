import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateProduct, IProduct } from '../domain/products.model';
import { ProductApplicationService } from '../application/product.application.service';

@Injectable({
  providedIn: 'root',
})
export class ProductControllerService {
  private application = inject(ProductApplicationService);

  findAll(): Observable<IProduct[]> {
    return this.application.findAll();
  }
  create(data: ICreateProduct): Observable<IProduct> {
    return this.application.create(data);
  }

  findById(id: number): Observable<IProduct> {
    return this.application.findById(id);
  }
}
