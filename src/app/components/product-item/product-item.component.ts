import { Component, Input, inject } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product!: Product
  _cart = inject(CartService)

  addCart(qty: number) {
    this._cart.add(this.product.id, qty)
    console.log(this._cart.getAll());
    alert(`'${this.product.name}' was added to your cart!`)
  }
}
