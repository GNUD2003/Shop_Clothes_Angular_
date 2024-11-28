import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  baseURL = 'https://localhost:7268/api';

  // MANAGE PRODUCT

  getManageAllProduct(
    keyword: string | null,
    PageSize: number,
    PageNumber: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('PageSize', PageSize.toString()) // Chuyển đổi thành chuỗi
      .set('PageNumber', PageNumber.toString()); // Chuyển đổi thành chuỗi

    if (keyword && keyword.trim() !== '') {
      params = params.set('keyword', keyword);
    }

    return this.http.get<any>(`${this.baseURL}/Product/Lay-Danh-Sch-Phan-Trang`, { params });
  }

  getManageAllSouldOutProduct(
    keyword: string | null,
    PageSize: number,
    PageNumber: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('PageSize', PageSize.toString()) // Chuyển đổi thành chuỗi
      .set('PageNumber', PageNumber.toString()); // Chuyển đổi thành chuỗi

    if (keyword && keyword.trim() !== '') {
      params = params.set('keyword', keyword);
    }

    return this.http.get<any>(`${this.baseURL}/Product/Lay-Danh-Sch-Phan-Trang-SoldOut`, { params });
  }

  addManageProduct(data: { name: string; price: number; description: string; cateId: number; mateId: number }) {
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(
      `${this.baseURL}/Product/AddNewProductByCateId/${data.cateId}MateId/${data.mateId}`,
      { name: data.name, price: data.price, description: data.description }
      , { responseType: 'text' }
    );
  }

  updateManageProduct(data: { name: string; price: number; description: string; Id: number }) {

    return this.http.put(
      `${this.baseURL}/Product/UpdateProduct?id=${data.Id}`,
      { name: data.name, price: data.price, description: data.description }
      , { responseType: 'text' }
    );
  }

  deleteManageProduct(id: number) {
    return this.http.put(
      `${this.baseURL}/Product/DeleteProductById/${id}`,
      {}, // Body rỗng
      { responseType: 'text' } // Định dạng trả về là text
    );
  }

  BackOnSaleManageProduct(id: number) {
    return this.http.put(
      `${this.baseURL}/Product/BackOnSaleProductById/${id}`,
      {}, // Body rỗng
      { responseType: 'text' } // Định dạng trả về là text
    );
  }


  // MANAGE CATEGORY
  getAllCategory() {
    return this.http.get<any[]>(`${this.baseURL}/Category/GetAllCategory`);
  }

  // MANAGE MATERIAL 
  getAllMaterial() {
    return this.http.get<any[]>(`${this.baseURL}/Material/GetAllMaterial`);
  }

  // MANAGE ACCOUNT USER

  getManageAllUser(
    keyword: string | null,
    PageSize: number,
    PageNumber: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('PageSize', PageSize.toString()) // Chuyển đổi thành chuỗi
      .set('PageNumber', PageNumber.toString()); // Chuyển đổi thành chuỗi

    if (keyword && keyword.trim() !== '') {
      params = params.set('keyword', keyword);
    }

    return this.http.get<any>(`${this.baseURL}/User/GetAllStudent`, { params });
  }

  getManageAllBlockUser(
    keyword: string | null,
    PageSize: number,
    PageNumber: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('PageSize', PageSize.toString()) // Chuyển đổi thành chuỗi
      .set('PageNumber', PageNumber.toString()); // Chuyển đổi thành chuỗi

    if (keyword && keyword.trim() !== '') {
      params = params.set('keyword', keyword);
    }

    return this.http.get<any>(`${this.baseURL}/User/GetAllBlockStudent`, { params });
  }

  BlockManageUser(id: number) {
    return this.http.put(
      `${this.baseURL}/User/BlockUserById/${id}`,
      {}, // Body rỗng
      { responseType: 'text' } // Định dạng trả về là text
    );
  }

  UnBlockManageUser(id: number) {
    return this.http.put(
      `${this.baseURL}/User/AuthenAgainUserById/${id}`,
      {}, // Body rỗng
      { responseType: 'text' } // Định dạng trả về là text
    );
  }


  // MANAGE ORDER

  getAllOrder() {
    return this.http.get<any[]>(`${this.baseURL}/Order/GetAllOrder`);
  }

  addManageOrder(data: { name: string; note: string; address: string; userId: number; phoneNumber: string; totalPrice: number }) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(
      `${this.baseURL}/Order/AddNewOrder/${data.userId}`,
      { name: data.name, note: data.note, address: data.address, phoneNumber: data.phoneNumber, totalPrice: data.totalPrice }
      , { headers: headers, responseType: 'text' },
    );
  }

  // addManageDetailOrder(data: { orderId: number, productId: number, quantity: number, price: number }) {
  //   return this.http.post(
  //     `${this.baseURL}/Order/AddNewOrderDetail/${data.orderId}/${data.productId}`,
  //     { quantity: data.quantity, price: data.price }
  //     , { responseType: 'text' },
  //   );
  // }

  // addManageDetailOrder(data: { orderId: number; products: { productId: number; quantity: number; price: number }[] }) {
  //   return this.http.post(
  //     `${this.baseURL}/Order/AddNewOrderDetail/${data.products.productId}`,
  //     { products: data.products },
  //     { responseType: 'text' }
  //   );
  // }

  // addManageDetailOrder(data: { products: number[]; quantity: number }): Observable<any> {
  //   // `products` là danh sách ID sản phẩm, `quantity` là số lượng chung
  //   return this.http.post(
  //     `${this.baseURL}/Order/AddNewOrderDetail`, // Endpoint không có `:productId`
  //     { quantity: data.quantity }, // Body request chỉ chứa `quantity`
  //     {
  //       params: { products: data.products.join(',') }, // Gửi `products` qua query string
  //       responseType: 'text', // Đáp ứng dưới dạng text
  //     }
  //   );
  // }

  addManageDetailOrder(data: {
    products: {
      productId: number; quantity: number, img_product: string
    }[]
  }) {
    // Tạo query string từ danh sách products
    const queryParams = data.products.map((item) => `products=${item.productId}`).join('&');
    const url = `${this.baseURL}/Order/AddNewOrderDetail?${queryParams}`;

    // Tạo body request từ danh sách số lượng
    const body = data.products.map((item) => ({
      quantity: item.quantity,
      img_product: item.img_product
    }));

    return this.http.post(url, body, { responseType: 'text' });
  }

  getManageAllOrder(
    keyword: string | null,
    PageSize: number,
    PageNumber: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('PageSize', PageSize.toString()) // Chuyển đổi thành chuỗi
      .set('PageNumber', PageNumber.toString()); // Chuyển đổi thành chuỗi

    if (keyword && keyword.trim() !== '') {
      params = params.set('keyword', keyword);
    }

    return this.http.get<any>(`${this.baseURL}/Order/GetAllOrderPaging`, { params });
  }
  getManageRejectAllOrder(
    keyword: string | null,
    PageSize: number,
    PageNumber: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('PageSize', PageSize.toString()) // Chuyển đổi thành chuỗi
      .set('PageNumber', PageNumber.toString()); // Chuyển đổi thành chuỗi

    if (keyword && keyword.trim() !== '') {
      params = params.set('keyword', keyword);
    }

    return this.http.get<any>(`${this.baseURL}/Order/GetAllOrderRejectPaging`, { params });
  }
  getManageApproveAllOrder(
    keyword: string | null,
    PageSize: number,
    PageNumber: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('PageSize', PageSize.toString()) // Chuyển đổi thành chuỗi
      .set('PageNumber', PageNumber.toString()); // Chuyển đổi thành chuỗi

    if (keyword && keyword.trim() !== '') {
      params = params.set('keyword', keyword);
    }

    return this.http.get<any>(`${this.baseURL}/Order/GetAllOrderApprovePaging`, { params });
  }

  getManageAllOrderDetail(
    keyword: string | null,
    PageSize: number,
    PageNumber: number,
    orderId: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('PageSize', PageSize.toString())
      .set('PageNumber', PageNumber.toString())
      .set('id', orderId.toString()); // Truyền orderId vào query params

    if (keyword && keyword.trim() !== '') {
      params = params.set('keyword', keyword);
    }

    return this.http.get<any>(`${this.baseURL}/Order/GetAllOrderDetailPaging`, { params });
  }

  deleteManageOrder(id: number) {
    return this.http.put(
      `${this.baseURL}/Order/RejectOrderById/${id}`,
      {}, // Body rỗng
      { responseType: 'text' } // Định dạng trả về là text
    );
  }

  approveManageOrder(id: number) {
    return this.http.put(
      `${this.baseURL}/Order/ApproveOrderById/${id}`,
      {}, // Body rỗng
      { responseType: 'text' } // Định dạng trả về là text
    );
  }

  CancelOrderDetail(id: number) {
    return this.http.put(
      `${this.baseURL}/Order/CancelOrderDetail/${id}`,
      {}, // Body rỗng
      { responseType: 'text' } // Định dạng trả về là text
    );
  }








}
