import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductList } from '../../model/product-list';
import { MasterService } from '../../shared/services/master.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { CartService } from '../../shared/services/cart.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxPaginationModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  productList: ProductList[] = [];
  productListBestSeller: ProductList[] = [];
  masterService = inject(MasterService);

  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      if (this.menuOpen) {
        navLinks.classList.add('show');
      } else {
        navLinks.classList.remove('show');
      }
    }
  }
  ngOnInit(): void {
    this.loadAllProduct();
    this.LoadBestSeller();
  }
  constructor(private router: Router, private authService: AuthService, private userService: UserService, private cartService: CartService) { }

  loadAllProduct(): void {
    this.masterService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res;

      },
      error: (err) => {
        console.error('Error loading products:', err);
      },
    });
  }
  LoadBestSeller() {

    this.masterService.getBestSeller().subscribe({
      next: (res: ProductList[]) => {
        this.productListBestSeller = res;
      },
      error: (err) => {
        console.error('Error fetching best-selling products:', err);
      },
    });
  }

  currentPage = 1;
  currentPage1 = 1;

  addToCart(product: ProductList): void {
    this.cartService.addToCart(product); // Thêm sản phẩm vào giỏ hàng
    alert('Sản phẩm đã được thêm vào giỏ hàng');
  }

  onLogout() {
    this.authService.deleteToken();
    this.router.navigateByUrl('/user/login');
  }
  onInfor() {
    this.router.navigateByUrl('/userinfor');
  }

}
