import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../shared/services/admin.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  userId: number = 0;
  orders: any[] = [];
  keyword: string | null = null;
  PageSize = 5;
  PageNumber = 1;
  totalPages: number = 0; // Số trang tổng cộng
  totalCount: number = 0;


  orderst: any[] = [];


  constructor(private adminService: AdminService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    // Lấy userId từ token hoặc các phương pháp khác nếu cần
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeJwt(token);
      if (decodedToken && decodedToken.Id) {
        this.userId = decodedToken.Id; // Gán userId từ token
      }
    }

    this.loadOrders();
    this.loadAllOrder();
  }

  loadAllOrder() {
    this.adminService.getAllOrder().subscribe({
      next: (response) => {
        this.orderst = response; // Lưu danh sách categories
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }



  loadOrders(): void {
    this.userService
      .getHistoryOrder(this.keyword, this.PageSize, this.PageNumber, this.userId)
      .subscribe({
        next: (response) => {
          console.log('API Response:', response); // Log response để kiểm tra
          this.orders = response.data || [];
          this.totalCount = response.pagination?.totalCount || 0;
        },
        error: (error) => {
          console.error('Error fetching order details:', error);
        }
      });
  }
  // loadOrderDetails(): void {
  //   this.adminService
  //     .getManageAllOrderDetail(null, this.pageSize, this.pageNumber, this.orderId)
  //     .subscribe({
  //       next: (response) => {
  //         console.log('API Response:', response); // Log response để kiểm tra
  //         this.orderDetails = response.data || [];
  //         this.totalCount = response.pagination?.totalCount || 0;
  //       },
  //       error: (error) => {
  //         console.error('Error fetching order details:', error);
  //       }
  //     });
  // }




  // Hàm tự giải mã token JWT
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



  getOrderName(orderId: number): string {
    const order = this.orderst.find((m) => m.id === orderId);
    return order ? order.name : 'Unknown';
  }


  getOrderStatus(orderId: number): string {
    const order = this.orderst.find((o) => o.id === orderId);

    if (order) {
      switch (order.status) {
        case 0:
          return 'Cancel';
        case 1:
          return 'Pending';
        case 2:
          return 'Wait';
        default:
          return 'Unknown';
      }
    }
    return 'Unknown';
  }

  onSearch(): void {
    this.PageNumber = 1; // Reset về trang đầu tiên khi tìm kiếm
    this.loadOrders();
  }

  previousPage(): void {
    if (this.PageNumber > 1) {
      this.PageNumber--;
      this.loadOrders();
    }
  }

  nextPage(): void {
    if (this.PageNumber < this.totalPages) {
      this.PageNumber++;
      this.loadOrders();
    }
  }

  goToPage(page: number): void {
    this.PageNumber = page;
    this.loadOrders();
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  onDelete(orderId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.adminService.CancelOrderDetail(orderId).subscribe({
        next: () => {
          alert('Product deleted successfully!');
          this.loadOrders(); // Tải lại danh sách sản phẩm sau khi xóa
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          alert('Failed to delete product. Please try again.');
        }
      });
    }
  }

}
