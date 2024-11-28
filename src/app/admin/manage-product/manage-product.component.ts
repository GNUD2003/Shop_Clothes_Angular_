import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css'
})
export class ManageProductComponent implements OnInit {
  products: any[] = [];
  keyword: string | null = null;
  PageSize = 5;
  PageNumber = 1;
  totalPages: number = 0; // Số trang tổng cộng


  isEditMode: boolean = false; // Xác định modal đang ở chế độ thêm mới hay chỉnh sửa
  currentProductId: number | null = null; // ID sản phẩm cần chỉnh sửa

  categories: any[] = [];

  materials: any[] = [];

  constructor(private adminService: AdminService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadMaterials();
  }
  onLogout() {
    this.authService.deleteToken();
    this.router.navigateByUrl('/user/login');
  }


  loadProducts(): void {
    this.adminService
      .getManageAllProduct(this.keyword, this.PageSize, this.PageNumber)
      .subscribe({
        next: (response) => {
          console.log('Full API response:', response);
          this.products = response.data || [];
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
    this.loadProducts();
  }

  previousPage(): void {
    if (this.PageNumber > 1) {
      this.PageNumber--;
      this.loadProducts();
    }
  }

  nextPage(): void {
    if (this.PageNumber < this.totalPages) {
      this.PageNumber++;
      this.loadProducts();
    }
  }

  goToPage(page: number): void {
    this.PageNumber = page;
    this.loadProducts();
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  @ViewChild('myModal') model: ElementRef | undefined;

  formData = {
    name: '',
    price: null,
    description: '',
    countOfProduct: null,
    cateId: null,
    mateId: null
  };

  openModel(product: any = null): void {
    if (product) {
      // Chế độ chỉnh sửa
      this.isEditMode = true;
      this.currentProductId = product.id;
      this.formData = {
        name: product.name,
        price: product.price,
        description: product.description,
        countOfProduct: product.countOfProduct,
        cateId: product.cateId,
        mateId: product.mateId
      };
    } else {
      // Chế độ thêm mới
      this.isEditMode = false;
      this.currentProductId = null;
      this.resetForm();
    }

    const empModel = document.getElementById('myModal');
    if (empModel != null) {
      empModel.style.display = 'block';
    }
  }
  onCloseModel() {
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }


  onSaveCreate() {
    const nameInput = (document.getElementsByName('name')[0] as HTMLInputElement).value;
    const priceInput = (document.getElementsByName('price')[0] as HTMLInputElement).value;
    const descriptionInput = (document.getElementsByName('description')[0] as HTMLInputElement).value;
    const countOfProduct = (document.getElementsByName('countOfProduct')[0] as HTMLInputElement).value
    const cateSelect = (document.getElementById('category') as HTMLSelectElement).value;
    const mateSelect = (document.getElementById('material') as HTMLSelectElement).value;

    const newProduct = {
      name: nameInput,
      price: +priceInput, // Chuyển thành số
      description: descriptionInput,
      cateId: +cateSelect, // Chuyển thành số
      mateId: +mateSelect // Chuyển thành số
    };


    this.adminService.addManageProduct(newProduct).subscribe({
      next: (response) => {
        console.log('Product added:', response);
        alert('Product added successfully!');
        this.resetForm();
        this.onCloseModel(); // Đóng modal
        this.loadProducts(); // Tải lại danh sách sản phẩm
      },
      error: (error) => {
        console.error('Error adding product:', error);
        if (error.status === 200) {
          alert('Product was added, but the response format might be incorrect.');
        } else {
          alert('Failed to add product. Please try again.');
        }
      }
    });

  }
  resetForm(): void {
    this.formData = {
      name: '',
      price: null,
      description: '',
      countOfProduct: null,
      cateId: null,
      mateId: null
    };
  }


  // Hàm để tải danh sách categories
  loadCategories() {
    this.adminService.getAllCategory().subscribe({
      next: (response) => {
        this.categories = response; // Lưu danh sách categories
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  // Hàm để tải danh sách material
  loadMaterials() {
    this.adminService.getAllMaterial().subscribe({
      next: (response) => {
        this.materials = response; // Lưu danh sách categories
      },
      error: (error) => {
        console.error('Error loading materials:', error);
      }
    });
  }
  getCategoryName(cateId: number): string {
    const category = this.categories.find((c) => c.id === cateId);
    return category ? category.name : 'Unknown';
  }

  getMaterialName(mateId: number): string {
    const material = this.materials.find((m) => m.id === mateId);
    return material ? material.name : 'Unknown';
  }
  onUpdate(product: any): void {
    // Cập nhật dữ liệu sản phẩm được chọn vào formData
    this.formData = {
      name: product.name,
      price: product.price,
      description: product.description,
      countOfProduct: product.countOfProduct,
      cateId: product.cateId,
      mateId: product.mateId,
    };

    // Mở modal
    this.openModel(product);
  }
  onDelete(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.adminService.deleteManageProduct(productId).subscribe({
        next: () => {
          alert('Product deleted successfully!');
          this.loadProducts(); // Tải lại danh sách sản phẩm sau khi xóa
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          alert('Failed to delete product. Please try again.');
        }
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.currentProductId) {
      // Cập nhật sản phẩm
      const updatedProduct = {
        name: this.formData.name || '', // Đảm bảo không phải null
        price: this.formData.price || 0, // Giá trị mặc định nếu null
        description: this.formData.description || '', // Đảm bảo không phải null
        cateId: this.formData.cateId || 0, // Đảm bảo không phải null
        mateId: this.formData.mateId || 0, // Đảm bảo không phải null
        Id: this.currentProductId
      };

      this.adminService.updateManageProduct(updatedProduct).subscribe({
        next: () => {
          alert('Product updated successfully!');
          this.onCloseModel();
          this.loadProducts(); // Tải lại danh sách sản phẩm
        },
        error: (error) => {
          console.error('Error updating product:', error);
          alert('Failed to update product. Please try again.');
        }
      });
    } else {
      // Thêm mới sản phẩm
      const newProduct = {
        name: this.formData.name || '',
        price: this.formData.price || 0,
        description: this.formData.description || '',
        cateId: this.formData.cateId || 0,
        mateId: this.formData.mateId || 0
      };

      this.adminService.addManageProduct(newProduct).subscribe({
        next: () => {
          alert('Product added successfully!');
          this.onCloseModel();
          this.loadProducts(); // Tải lại danh sách sản phẩm
        },
        error: (error) => {
          console.error('Error adding product:', error);
          alert('Failed to add product. Please try again.');
        }
      });
    }
  }
  openSoldOut() {
    this.router.navigateByUrl('/admin/manageProductSoldOut')
  }

}