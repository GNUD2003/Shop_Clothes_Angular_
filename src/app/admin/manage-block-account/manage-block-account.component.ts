import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-block-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './manage-block-account.component.html',
  styleUrl: './manage-block-account.component.css'
})
export class ManageBlockAccountComponent implements OnInit {
  users: any[] = [];
  keyword: string | null = null;
  PageSize = 5;
  PageNumber = 1;
  totalPages: number = 0; // Số trang tổng cộng


  isEditMode: boolean = false; // Xác định modal đang ở chế độ thêm mới hay chỉnh sửa
  currentProductId: number | null = null; // ID sản phẩm cần chỉnh sửa

  categories: any[] = [];

  materials: any[] = [];

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();

  }


  loadUsers(): void {
    this.adminService
      .getManageAllBlockUser(this.keyword, this.PageSize, this.PageNumber)
      .subscribe({
        next: (response) => {
          console.log('Full API response:', response);
          this.users = response.data || [];
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
    this.loadUsers();
  }

  previousPage(): void {
    if (this.PageNumber > 1) {
      this.PageNumber--;
      this.loadUsers();
    }
  }

  nextPage(): void {
    if (this.PageNumber < this.totalPages) {
      this.PageNumber++;
      this.loadUsers();
    }
  }

  goToPage(page: number): void {
    this.PageNumber = page;
    this.loadUsers();
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  openSoldOut() {
    this.router.navigateByUrl('/admin/manageAccount')
  }

  onAuthen(productId: number): void {
    if (confirm('Are you sure you want to Block User Account?')) {
      this.adminService.UnBlockManageUser(productId).subscribe({
        next: () => {
          alert('Block User Account successfully!');
          this.loadUsers(); // Tải lại danh sách sản phẩm sau khi xóa
        },
        error: (error) => {
          console.error('Error Block User Account:', error);
          alert('Failed to Block User Account. Please try again.');
        }
      });
    }
  }
  onUpdate() {

  }
}
