import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  // Thiết lập cookie với thời gian hết hạn
  setCookie(name: string, value: any, days: number): void {
    try {
      const jsonValue = encodeURIComponent(JSON.stringify(value)); // Encode JSON để lưu
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Tính thời gian hết hạn
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${name}=${jsonValue}; ${expires}; path=/`; // Lưu cookie
    } catch (error) {
      console.error('Error setting cookie:', error);
    }
  }

  // Lấy cookie theo tên
  // getCookie(name: string): any {
  //   try {
  //     const cookies = document.cookie.split(';');
  //     for (const cookie of cookies) {
  //       const [key, value] = cookie.trim().split('=');
  //       if (key === name) {
  //         return JSON.parse(decodeURIComponent(value)); // Phân tích chuỗi JSON
  //       }
  //     }
  //     return null; // Trả về null nếu cookie không tồn tại
  //   } catch (error) {
  //     console.error('Error getting cookie:', error);
  //     return null;
  //   }
  // }
  getCookie(name: string): any {
    try {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) {
          const decodedValue = decodeURIComponent(value); // Decode giá trị cookie
          if (this.isValidJson(decodedValue)) {
            return JSON.parse(decodedValue); // Phân tích chuỗi JSON
          } else {
            console.error('Invalid JSON in cookie:', decodedValue);
            return null;
          }
        }
      }
      return null; // Trả về null nếu cookie không tồn tại
    } catch (error) {
      console.error('Error getting cookie:', error);
      return null;
    }
  }

  // Hàm kiểm tra JSON hợp lệ
  private isValidJson(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  }

  // Xóa cookie theo tên
  deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  // Xóa tất cả cookie
  deleteAllCookies(): void {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const key = cookie.split('=')[0].trim();
      this.deleteCookie(key);
    }
  }
}
