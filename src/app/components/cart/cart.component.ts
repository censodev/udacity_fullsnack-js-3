import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Product, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  _cart = inject(CartService)
  _product = inject(ProductService)
  _router = inject(Router)

  prdMap!: { [key: number]: Product }
  cart!: { [key: number]: number }
  prdIds!: number[]
  totalAmount!: number
  checkoutFrm = new FormGroup({
    fullname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [Validators.required, Validators.minLength(6)]),
    creditCard: new FormControl('', [Validators.required, Validators.minLength(16), Validators.pattern(/^[0-9]+$/)]),
  })

  get fullname() {
    return this.checkoutFrm.get('fullname')
  }
  get address() {
    return this.checkoutFrm.get('address')
  }
  get creditCard() {
    return this.checkoutFrm.get('creditCard')
  }

  async ngOnInit(): Promise<void> {
    const products = await lastValueFrom(this._product.list())
    this.prdMap = products.reduce((acc: { [key: number]: Product }, prd) => {
      acc[prd.id] = prd
      return acc
    }, {})
    this.loadCart()
  }

  loadCart() {
    this.cart = this._cart.getAll()
    this.prdIds = Object.keys(this.cart).map(i => +i)
    this.totalAmount = this.calcTotalAmount()
  }

  calcTotalAmount() {
    return this.prdIds.map(prdId => {
      return this.prdMap[prdId].price * this.cart[prdId]
    }).reduce((acc, cur) => acc + cur, 0)
  }

  onQtyChange(prdId: number, qty: number) {
    this._cart.set(prdId, qty)
    this.loadCart()
    if (qty === 0)
      alert('Removed item from cart!')
  }

  submit() {
    if (this.checkoutFrm.invalid) {
      this.fullname?.markAsDirty()
      this.address?.markAsDirty()
      this.creditCard?.markAsDirty()
      return
    }
    this._router.navigate(['/confirmation'], { queryParams: { fullname: this.checkoutFrm.get('fullname')?.value, totalAmount: this.totalAmount } })
  }
}
