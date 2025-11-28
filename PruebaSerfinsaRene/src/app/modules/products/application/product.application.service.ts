import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateProduct, IProduct } from '../domain/products.model';
import { IProductsRepository } from '../domain/products.repository';
import { ProductInfraestructureService } from '../infraestructure/product.infraestructure.service';

@Injectable({
  providedIn: 'root',
})
export class ProductApplicationService {
  repository = inject<IProductsRepository>(ProductInfraestructureService);

  findAll(): Observable<IProduct[]> {
    return this.repository.findAll();
  }
  create(data: ICreateProduct): Observable<IProduct> {
    return this.repository.create(data);
  }

  findById(id: number): Observable<IProduct> {
    return this.repository.findById(id);
  }
}
