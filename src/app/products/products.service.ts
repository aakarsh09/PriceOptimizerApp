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

  getProducts(): Observable<ProductApiResponse> {
    return this.http.get<ProductApiResponse>(this.apiUrl+'view');
  }

  addProduct(productData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'add/', productData);
  }

}
