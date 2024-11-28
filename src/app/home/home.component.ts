import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductList } from '../model/product-list';
import { MasterService } from '../shared/services/master.service';
import { CartService } from '../shared/services/cart.service';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxPaginationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  productList: ProductList[] = [];
  productListBestSeller: ProductList[] = [];


  constructor(private cartService: CartService, private masterService: MasterService) { }

  ngOnInit(): void {
    this.loadAllProduct();
    this.LoadBestSeller();
  }

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
}
