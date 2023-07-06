import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, map, tap } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Product, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.scss']
})
export class ProductItemDetailComponent implements OnInit {
  _activatedRoute = inject(ActivatedRoute)
  _product = inject(ProductService)
  _cart = inject(CartService)

  product!: Product | undefined

  ngOnInit(): void {
    this._activatedRoute.params.pipe(
      map(i => i['id']),
      concatMap(id => this._product.get(id)),
      tap(prd => console.log(prd),
      )
    ).subscribe(prd => this.product = prd)
  }


  addCart(qty: number) {
    if (!this.product)
      return
    this._cart.add(this.product.id, qty)
    console.log(this._cart.getAll());
    alert(`'${this.product.name}' was added to your cart!`)
  }
}
