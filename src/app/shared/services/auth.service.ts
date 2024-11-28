import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TOKEN_KEY } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  baseURL = 'https://localhost:7268/api';

  createUser(formData: any) {
    return this.http.post(this.baseURL + '/Auth/Register', formData)
  }


  confirmEmail(confirmCode: string) {
    return this.http.post(
      `${this.baseURL}/Auth/CheckEmail?confirmCode=${encodeURIComponent(confirmCode)}`, // Gửi confirmCode qua query
      {}, // Body rỗng
      { responseType: 'text' } // Xử lý response dưới dạng text
    );
  }

  forgotPassword(email: string) {
    return this.http.post(
      `${this.baseURL}/Auth/ForgotPassword?email=${encodeURIComponent(email)}`, // Thêm email vào query string
      {}, // Body rỗng
      { responseType: 'text' } // Xử lý response dưới dạng text
    );
  }


  updatePassword(data: { confirmCode: string; newPassword: string; confirmPassword: string }) {
    return this.http.put(
      `${this.baseURL}/Auth/NewPassword`,
      data, // Body dữ liệu cần gửi
      { responseType: 'text' } // Phản hồi dạng văn bản
    );
  }

  changePassword(data: { oldPassWord: string; newPassWord: string; confirmPassWord: string }) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(
      `${this.baseURL}/Auth/ChangePassword`,
      data, // Body dữ liệu cần gửi
      { headers: headers, responseType: 'text' },
    );
  }



  Login(formData: any) {
    return this.http.post(this.baseURL + '/Auth/Login', formData)
  }

  isLoggedId() {
    return localStorage.getItem(TOKEN_KEY) != null;
  }


  deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
  getToken(): string | null {
    return localStorage.getItem('token'); // Lấy token từ localStorage
  }
  // Giải mã token và lấy userId
  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      // Phân tách token và giải mã payload (phần giữa)
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64); // Giải mã base64
      const payload = JSON.parse(payloadJson); // Chuyển sang object
      return payload.userId || null; // Trích xuất userId từ payload
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }


}
