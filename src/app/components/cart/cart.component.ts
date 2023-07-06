import { Component, inject, OnInit } from '@angular/core';
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
  checkoutFrm = {
    fullname: '',
    address: '',
    creditCard: '',
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

  onQtyChange(prdId: number, e: Event) {
    const qty: number = +(e.target as HTMLInputElement).value
    this._cart.set(prdId, qty)
    this.loadCart()
  }

  submit() {
    if (this.checkoutFrm.fullname.length < 3) {
      alert('Full name must have at least 3 characters')
      return
    }
    if (this.checkoutFrm.address.length < 6) {
      alert('Address must have at least 6 characters')
      return
    }
    if (this.checkoutFrm.creditCard.length < 16) {
      alert('Credit card number must have at least 16 characters')
      return
    }
    this._router.navigate(['/confirmation'], { queryParams: { fullname: this.checkoutFrm.fullname, totalAmount: this.totalAmount } })
  }
}
