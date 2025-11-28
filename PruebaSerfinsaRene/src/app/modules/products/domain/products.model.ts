export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  productTypeId: number;
  productTypeName: string;
  createdBy: number;
}

export interface ICreateProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  productTypeId: number;
}
