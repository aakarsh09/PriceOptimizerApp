import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductApiResponse } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:8000/products/'; 

  constructor(private http: HttpClient) {}

  getProducts(searchTerm: string = ''): Observable<ProductApiResponse> {
    let params = {};
    if (searchTerm && searchTerm.trim() !== '') {
      params = { search: searchTerm.trim() };
    }
    return this.http.get<ProductApiResponse>(this.apiUrl + '', { params });
  }

  addProduct(productData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, productData);
  }

  updateProduct(productId: number, productData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${productId}/`, productData);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${productId}/`);
  }

  filterProductsByIds(productIds: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}filter_by_ids/`, { product_ids: productIds });
  }

}
