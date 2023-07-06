import { Observable } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { Product, ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  _product = inject(ProductService)
  _router = inject(Router)

  products$!: Observable<Product[]>

  ngOnInit(): void {
    this.products$ = this._product.list()
  }

  onProductItemClick(id: number) {
    this._router.navigate([`/product/${id}`])
  }
}
