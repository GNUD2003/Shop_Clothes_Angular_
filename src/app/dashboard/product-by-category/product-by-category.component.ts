import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductList } from '../../model/product-list';
import { MasterService } from '../../shared/services/master.service';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-product-by-category',
  standalone: true,
  imports: [RouterLink, CommonModule, NgxPaginationModule],
  templateUrl: './product-by-category.component.html',
  styleUrl: './product-by-category.component.css'
})
export class ProductByCategoryComponent implements OnInit {
  currentPage = 1;
  productList: ProductList[] = [];


  constructor(private route: ActivatedRoute, private productService: MasterService, private cartService: CartService) { }


  ngOnInit(): void {
    // Retrieve the category ID from the route parameters and load the products
    this.route.params.subscribe(params => {
      const id = +params['id']; // Convert the ID to a number
      if (id) {
        this.loadAllProductByCategory(id);
      }
    });
  }

  loadAllProductByCategory(id: number): void {
    // Call the service to fetch products by category
    this.productService.getProductByCategoryId(id).subscribe({
      next: (products) => {
        this.productList = products; // Assign the products to the productList array
      },
      error: (error) => {
        console.error('Error fetching products by category:', error);
      }
    });
  }

  addToCart(product: ProductList): void {
    this.cartService.addToCart(product); // Thêm sản phẩm vào giỏ hàng
    alert('Sản phẩm đã được thêm vào giỏ hàng');
  }
}

