import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-manage-order',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.css'
})
export class ManageOrderComponent {
  orders: any[] = [];
  keyword: string | null = null;
  PageSize = 5;
  PageNumber = 1;
  totalPages: number = 0; // Số trang tổng cộng
  status: string = 'pending';


  isEditMode: boolean = false; // Xác định modal đang ở chế độ thêm mới hay chỉnh sửa
  currentProductId: number | null = null; // ID sản phẩm cần chỉnh sửa


  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.loadOrders();
    //this.loadCategories();
    //this.loadMaterials();
  }


  loadOrders(): void {
    this.adminService
      .getManageAllOrder(this.keyword, this.PageSize, this.PageNumber)
      .subscribe({
        next: (response) => {
          console.log('Full API response:', response);
          this.orders = response.data || [];
          const totalCount = response.pagination.totalCount; // Lấy tổng số bản ghi
          this.totalPages = Math.ceil(totalCount / this.PageSize); // Tính tổng số trang
          console.log('Total pages:', this.totalPages);
        },
        error: (error) => {
          console.error('Error loading products:', error);
          alert('Could not load products. Please check your API and network settings.');
        },
        complete: () => {
          console.log('Product loading complete');
        },
      });
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
  onDetail(orderId: number): void {
    this.router.navigate(['/admin/manageOrderDetail', orderId]);


    // console.log('Selected Order ID:', orderId);
    // // this.router.navigateByUrl(['/admin/manageOrderDetail', orderId]);
    // this.router.navigate(['/admin/manageOrderDetail', orderId]); 
  }

  onStatusChange(): void {
    if (this.status === 'approve') {
      this.router.navigate(['/admin/manageApproveOrder']); // Điều hướng đến trang ManageApprove
    }
    else if (this.status === 'reject') {
      this.router.navigate(['/admin/manageRejectOrder']);
    }
    else {
      this.loadOrders(); // Tải danh sách đơn hàng dựa trên trạng thái mới
    }
  }
  onAprrove(orderId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.adminService.approveManageOrder(orderId).subscribe({
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
  onDelete(orderId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.adminService.deleteManageOrder(orderId).subscribe({
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
