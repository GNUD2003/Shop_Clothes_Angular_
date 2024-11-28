import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  baseURL = 'https://localhost:7268/api';

  getUserInfor() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseURL + '/AccountEndPoint/GetUserInfo', { headers })
  }
  getHistoryOrder(
    keyword: string | null,
    PageSize: number,
    PageNumber: number,
    id: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('PageSize', PageSize.toString())
      .set('PageNumber', PageNumber.toString())
      .set('id', id.toString()); // Truyền orderId vào query params

    if (keyword && keyword.trim() !== '') {
      params = params.set('keyword', keyword);
    }
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.baseURL}/Order/GetAllHistoryPaging`, { params, headers });
  }
}
