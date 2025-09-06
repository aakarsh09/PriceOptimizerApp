import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private apiUrl = 'http://localhost:8000/forecast/';

  constructor(private http: HttpClient) {}

  getChartData(productIds: number[] = []) {
    return this.http.post(this.apiUrl+'chart-data/', { product_ids: productIds });
  }
  
  generateForecast(productIds: number[] = []) {
    return this.http.post(this.apiUrl, { product_ids: productIds });
  }

}
