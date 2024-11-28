import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductList } from '../../model/product-list';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = 'https://localhost:7268/api/Product/GetAllProduct'
  private product_detail_Url = 'https://localhost:7268/api/Product/GetById'
  private product_by_category = 'https://localhost:7268/api/Product/GetAllProductByCategory'
  private product_best_seller = 'https://localhost:7268/api/Product/GetBestCountOfProducts'
  constructor(private http: HttpClient) {

  }
  getAllProducts(): Observable<ProductList[]> {
    return this.http.get<ProductList[]>(this.apiUrl);
  }
  getProductById(id: number): Observable<ProductList> {
    return this.http.get<ProductList>(`${this.product_detail_Url}/${id}`);
  }
  getProductByCategoryId(id: number): Observable<ProductList[]> {
    return this.http.get<ProductList[]>(`${this.product_by_category}/${id}`);
  }
  getBestSeller(): Observable<ProductList[]> {
    return this.http.get<ProductList[]>(`${this.product_best_seller}`);
  }
}
