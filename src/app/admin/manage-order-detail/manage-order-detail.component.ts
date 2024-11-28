import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-order-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './manage-order-detail.component.html',
  styleUrl: './manage-order-detail.component.css'
})
export class ManageOrderDetailComponent implements OnInit {
  orderId: number = 0; // Lưu trữ orderId
  orderDetails: any[] = []; // Lưu trữ danh sách order details
  totalCount: number = 0; // Tổng số bản ghi
  pageSize: number = 5; // Số bản ghi mỗi trang
  pageNumber: number = 1; // Trang hiện tại

  constructor(private route: ActivatedRoute, private adminService: AdminService) { }

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('orderId'));
    console.log('Loaded Order ID:', this.orderId); // Log kiểm tra orderId
    if (this.orderId) {
      this.loadOrderDetails();
    }
  }

  loadOrderDetails(): void {
    this.adminService
      .getManageAllOrderDetail(null, this.pageSize, this.pageNumber, this.orderId)
      .subscribe({
        next: (response) => {
          console.log('API Response:', response); // Log response để kiểm tra
          this.orderDetails = response.data || [];
          this.totalCount = response.pagination?.totalCount || 0;
        },
        error: (error) => {
          console.error('Error fetching order details:', error);
        }
      });
  }

  // Điều hướng giữa các trang
  nextPage(): void {
    if (this.pageNumber * this.pageSize < this.totalCount) {
      this.pageNumber++;
      this.loadOrderDetails();
    }
  }

  previousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadOrderDetails();
    }
  }
}