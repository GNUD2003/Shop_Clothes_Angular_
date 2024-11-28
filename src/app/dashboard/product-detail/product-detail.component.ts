import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductList } from '../../model/product-list';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from '../../shared/services/master.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: ProductList | null = null;

  constructor(private route: ActivatedRoute, private productService: MasterService) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe((data: ProductList | null) => {
        this.product = data;
      });
    }
  }
}