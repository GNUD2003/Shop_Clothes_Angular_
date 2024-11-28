import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICart } from '../../model/icart';
import { ProductList } from '../../model/product-list';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root', // Chia sẻ dịch vụ trên toàn ứng dụng
})
export class CartService {
  items: ICart[] = [];

  constructor(private cookieService: CookieService) {
    this.loadCartFromCookies(); // Tải dữ liệu giỏ hàng từ cookie khi khởi tạo
  }

  // Lưu giỏ hàng vào cookie
  saveCartToCookies(): void {
    this.cookieService.setCookie('cart_items', this.items, 1); // Lưu cookie với thời hạn 7 ngày
  }

  // Tải giỏ hàng từ cookie
  // loadCartFromCookies(): void {
  //   const cartData = this.cookieService.getCookie('cart_items'); // Lấy cookie
  //   if (cartData) {
  //     try {
  //       this.items = cartData; // Parse thành mảng nếu hợp lệ
  //     } catch (error) {
  //       console.error('Error loading cart from cookies:', error);
  //       this.items = []; // Nếu lỗi, khởi tạo mảng trống
  //     }
  //   } else {
  //     this.items = []; // Nếu không có cookie, khởi tạo mảng trống
  //   }
  // }
  loadCartFromCookies(): void {
    const cartData = this.cookieService.getCookie('cart_items'); // Lấy cookie
    if (cartData) {
      try {
        this.items = cartData; // Parse thành mảng nếu hợp lệ
      } catch (error) {
        console.error('Error loading cart from cookies:', error);
        this.cookieService.deleteCookie('cart_items'); // Xóa cookie không hợp lệ
        this.items = []; // Khởi tạo mảng trống
      }
    } else {
      this.items = []; // Nếu không có cookie, khởi tạo mảng trống
    }
  }
  // addToCart(product: ProductList): void {
  //   const index = this.items.findIndex((item) => item.id === product.id);

  //   if (index >= 0) {
  //     this.items[index].cout++;
  //   } else {
  //     this.items.push({
  //       id: product.id,
  //       name: product.name,
  //       price: product.price,
  //       img_product: product.img_product,
  //       cout: 1,
  //     });
  //   }
  //   this.saveCartToCookies(); // Lưu lại giỏ hàng vào cookie
  // }

  addToCart(product: ProductList): void {
    const index = this.items.findIndex((item) => item.id === product.id);

    if (index >= 0) {
      this.items[index].cout++;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        img_product: product.img_product,
        cout: 1,
      });
    }
    this.saveCartToCookies(); // Lưu lại giỏ hàng vào cookie
  }



  getItems(): ICart[] {
    return this.items;
  }

  clearCart(): void {
    this.items = [];
    this.saveCartToCookies(); // Xóa giỏ hàng trong cookie
  }

}




