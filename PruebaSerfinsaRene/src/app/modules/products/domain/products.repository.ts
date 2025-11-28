import { Observable } from 'rxjs';
import { ICreateProduct, IProduct } from './products.model';

export interface IProductsRepository {
  findAll(): Observable<IProduct[]>;
  create(data: ICreateProduct): Observable<IProduct>;
  findById(id: number): Observable<IProduct>;
}
