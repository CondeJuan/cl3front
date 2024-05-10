import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  getProducts(){
    return this.http.get<Product[]>('http://localhost:8081/api/cl3/productos');
  }
  getProductsbyid(id:number){
    return this.http.get<Product>(`http://localhost:8081/api/cl3/productos/${id}`);
  }
  createProducts(product:Product){
    return this.http.post<Product>('http://localhost:8081/api/cl3/productos',product);
  }
  updateProduct(id:number, product:Product){
    return this.http.put<Product>(`http://localhost:8081/api/cl3/productos/${id}`, product);
  }
  deleteProduct(id: number){
    return this.http.delete(`http://localhost:8081/api/cl3/productos/${id}`);
  }
}
