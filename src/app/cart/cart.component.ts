import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ICart } from '../model/icart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminService } from '../shared/services/admin.service';
import { AuthService } from '../shared/services/auth.service';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  items: ICart[] = [];
  formData = {
    name: '',
    phoneNumber: '',
    address: '',
    note: '',
    totalPrice: 0,
    userId: 0, // Mặc định, bạn cần cập nhật userId nếu có session login
  };

  constructor(
    public adminservice: AdminService,
    public cartservice: CartService,
    public authservice: AuthService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.items = this.cartservice.getItems(); // Lấy dữ liệu từ CartService
  }

  tongtien(): number {
    return this.items.reduce((total, item) => total + item.price * item.cout, 0);
  }

  tongsoluong(): number {
    return this.items.reduce((total, item) => total + item.cout, 0);
  }

  clearCart(): void {
    this.cartservice.clearCart();
    this.items = this.cartservice.getItems();
  }

  BuyOrder(): void {
    const empModel = document.getElementById('myModal');
    if (empModel) {
      empModel.style.display = 'block';
    }
  }

  onCloseModel(): void {
    const empModel = document.getElementById('myModal');
    if (empModel) {
      empModel.style.display = 'none';
    }
  }

  onSubmit(): void {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    if (!token) {
      alert('Please log in to place an order!');
      this.router.navigate(['/user/login']); // Chuyển hướng đến trang đăng nhập
      return;
    }

    let Id: number | null = null; // Khai báo userId bên ngoài block

    const decodedToken = this.decodeJwt(token);
    if (decodedToken) {
      Id = decodedToken.Id; // Gán giá trị từ token
      console.log('Decoded token:', decodedToken);
    }

    if (!Id) {
      alert('Invalid token! Please log in again.');
      this.router.navigate(['/user/login']); // Chuyển hướng đến trang đăng nhập
      return;
    }

    if (!this.formData.name || !this.formData.phoneNumber || !this.formData.address) {
      alert('Please fill in all required fields!');
      return;
    }

    const totalPrice = this.tongtien();

    // Tạo payload đơn hàng chính
    const orderData = {
      name: this.formData.name,
      note: this.formData.note,
      address: this.formData.address,
      userId: Id, // Sử dụng userId từ token
      phoneNumber: this.formData.phoneNumber,
      totalPrice: totalPrice,
    };

    console.log('Order Data:', orderData); // Kiểm tra log payload gửi lên API

    // Gửi dữ liệu đơn hàng chính
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.adminservice.addManageOrder(orderData).subscribe({
      next: (response) => {
        console.log('Order placed successfully:', response);
        alert('Order placed successfully!');

        // Tạo danh sách `orderDetails` với từng sản phẩm và số lượng tương ứng
        const orderDetails = this.items.map((item) => ({
          productId: item.id, // ID sản phẩm
          quantity: item.cout, // Số lượng của từng sản phẩm
          img_product: item.img_product
        }));

        console.log('Order Details Payload:', orderDetails); // Kiểm tra log payload gửi lên API

        // Gửi danh sách sản phẩm qua API
        this.adminservice.addManageDetailOrder({ products: orderDetails }).subscribe({
          next: (res) => {
            console.log('Order details added successfully:', res);
            alert('Order details added successfully!');
            this.clearCart(); // Xóa giỏ hàng
            this.onCloseModel(); // Đóng modal
          },
          error: (err) => {
            console.error('Error adding order details:', err);
          },
        });
      },
      error: (err) => {
        console.error('Error placing order:', err);
        alert('Failed to place order. Please try again later!');
      },
    });
  }
  private decodeJwt(token: string): any {
    try {
      // Tách lấy phần payload của token
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload); // Trả về object JSON
    } catch (error) {
      console.error('Error decoding token:', error);
      return null; // Trả về null nếu giải mã thất bại
    }
  }
  // clearCart() {
  //   this.items = this.cartservice.clearCart(); // Xóa giỏ hàng
  // }

}


